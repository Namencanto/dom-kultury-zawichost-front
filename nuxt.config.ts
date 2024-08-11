export default defineNuxtConfig({
  modules: [
    "@nuxtjs/robots",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "nuxt-og-image",
    "@element-plus/nuxt",
    "@nuxtjs/stylelint-module",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vesp/nuxt-fontawesome",
    "nuxt-icons",
    "@nuxt/image",
    "@nuxt/content"
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  compatibilityDate: "2024-08-03",
});