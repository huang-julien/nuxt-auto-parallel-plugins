import { defineNuxtPlugin } from "#imports"

export default defineNuxtPlugin({
    name: 'force-false-plugin',
    parallel: false,
    setup() {
        return {
            provide: {
                forceFalse: 'this should not be parallel'
            }
        }
    }
})