import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin({
    name: 'ignored',
    setup() {
        return {
            provide: {
                ignored: 'this should not be parallel'
            }
        }
    }
})