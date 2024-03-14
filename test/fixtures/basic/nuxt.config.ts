import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  parallelPlugins: {
    ignore: (id: string) => id.includes('ignored')
  }
})
