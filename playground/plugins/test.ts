// @ts-expect-error virtual file
import plugins from "#build/plugins"

export default defineNuxtPlugin({
    name: 'test',
    setup() {
        return {
            provide: {
                test: plugins
            }
        }
    }
})