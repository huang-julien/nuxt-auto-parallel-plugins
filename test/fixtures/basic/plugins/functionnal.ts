import {defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
    return {
        provide: {
            functionnal: 'this should be parallel by default'
        }
    }
})