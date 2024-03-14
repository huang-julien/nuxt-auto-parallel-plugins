import { defineNuxtModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * ignore plugins by path import
   * return true to ignore
   */
  ignore: (id: string) => boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-auto-parallel-plugins',
    configKey: 'parallelPlugins'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    ignore: () => false
  },
  setup (options, nuxt) {    
    nuxt.hook('app:templates', (app) => {
      app.templates.filter(i => i.filename?.startsWith('plugins/'))
      .forEach((i) => {
        if (!i.getContents)
          return
        const original = i.getContents
        i.getContents = async (...args) => {
          let content = await original(...args) 
          const WRAPPER_KEY = '__PARALLEL_WRAPPER__'

          const snippets = ` 
function ${WRAPPER_KEY} (plugin) {
  if (!plugin)
    return plugin;

    if(typeof plugin === 'function' && typeof plugin.parallel === 'undefined') {
      plugin.parallel = true
    }
}
`

          const imports = Array.from(content.matchAll(/(?:\n|^)import (.*) from ['"](.*)['"]/g))
            .map(([, name, path]) => ({ name, path }))

          content = content.replace(/\nexport default\s*\[([\s\S]*)\]/, (full, itemsRaw: string) => {
            const items = itemsRaw.split(',').map(i => i.trim()).filter(i => {
              const importItem = imports.find(({ name }) => name === i)
                // don't wrap nuxt imports
              return !(!importItem || importItem.path.includes('nuxt/dist') || options.ignore(importItem.path))
            })
              .map((i) => {
                return `${WRAPPER_KEY}(${i})`
              })
            return `\n${content.includes(WRAPPER_KEY) ? '' : snippets}\n${items.join('\n')}\n${full}\n`
          })
 
          return content
        }
      })
  }) 
  }
})
