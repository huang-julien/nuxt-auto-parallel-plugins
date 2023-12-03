// @ts-expect-error virtual file
import plugins from "#build/plugins"
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin({
    name: 'plugin-provider',
    setup() {
        return {
            provide: {
                plugins
            }
        }
    }
})