import { defineNuxtModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-default-parallel-plugin',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup (_, nuxt) {    
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

  const parallel = plugin.parallel ?? true

  return defineNuxtPlugin({
    ...plugin,
    parallel,
  })
}
`

          const imports = Array.from(content.matchAll(/(?:\n|^)import (.*) from ['"](.*)['"]/g))
            .map(([, name, path]) => ({ name, path }))

          content = content.replace(/\nexport default\s*\[([\s\S]*)\]/, (_, itemsRaw: string) => {
            const items = itemsRaw.split(',').map(i => i.trim())
              .map((i) => {
                const importItem = imports.find(({ name }) => name === i)
                // don't wrap nuxt imports
                if (!importItem || importItem.path.includes('nuxt/dist'))
                  return i
                return `${WRAPPER_KEY}(${i})`
              })
            return `\n${snippets}\nexport default [\n${items.join(',\n')}\n]\n`
          })
 
          return content
        }
      })
  }) 
  }
})
