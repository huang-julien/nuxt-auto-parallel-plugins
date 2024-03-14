# nuxt-auto-parallel-plugins

Set all your nuxt plugins as `parallel` by default, even those added by modules.

Since Nuxt 3.9, a new `dependsOn` property has been added, allowing all plugins to be loaded in parallel instead of sequentially while making a plugin awaiting for another plugin to be loaded.

This module simply sets the `parallel` property of all your nuxt plugins to `true` by default instead of `false`.

## Usage

### Installation

Install the package
- `npm install -D nuxt-auto-parallel-plugins`
- `pnpm install -D nuxt-auto-parallel-plugins`
- `yarn add -D nuxt-auto-parallel-plugins`

### Add the module within the nuxt config

`nuxt.config.ts`

```ts
export default defineNuxtconfig({
    modules: ['nuxt-auto-parallel-plugins']
})
```

Et voilà ! All your plugins will be parallel by default. If you don't want some specific plugins to be parallel, you can set the `parallel` boolean to `false`

```ts
export default defineNuxtPlugin({
    name: 'sequential-plugin',
    setup() {
        // ...
    },
    parallel: false
})
```

###  Module options

You can set options with `parallelPlugins` within your config.

```ts
export interface ModuleOptions {
  ignore: (id: string) => boolean
}
```

This can be useful in case you don't want some plugins injected by modules to be parallel by default.

## Credits

- @manniL for the package name
