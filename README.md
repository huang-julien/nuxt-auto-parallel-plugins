# nuxt-auto-parallel-plugins

Set all your nuxt plugins as `parallel` by default, even those added by modules.

Since Nuxt 3.9, a new `dependsOn` property has been added, allowing all plugins to be loaded in parallel instead of sequentially while making a plugin awaiting for another plugin to be loaded.

This module simply set the `parallel` property of all your nuxt plugin to `true` by default instead of `false`.

## Credits

- @manniL for the package name