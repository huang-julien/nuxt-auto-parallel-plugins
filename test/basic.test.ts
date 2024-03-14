import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, createPage } from '@nuxt/test-utils'

describe('setup all plugins as parallel by default', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('expect plugins to be parallels (except the forced one)', async () => {
      const page = await createPage('/')
      const pluginsParallels = await page.evaluate(() => {
        // @ts-ignore
        return useNuxtApp().$plugins.map(i => i.parallel)
      })
      expect(pluginsParallels.slice(-4)).toMatchObject([undefined, false, true, true])

  })
})
