// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/lara-dark-blue/theme.css",
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    
    
],
modules: [
  // ...
  '@pinia/nuxt',
  '@nuxtjs/strapi'
],
strapi: {
  // Options
},
pinia: {
  autoImports: [
    // automatically imports `defineStore`
    'defineStore', // import { defineStore } from 'pinia'
    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
  ],
},
build: {
transpile: ["primevue"]
}
})
