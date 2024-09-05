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
    "@nuxt/content",
    "@nuxthq/studio",
    "@nuxtjs/html-validator",
  ],

  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },

  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3000/api",
  },

  css: ["vue-final-modal/style.css"],

  runtimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    API_USERNAME: process.env.API_USERNAME,
    API_PASSWORD: process.env.API_PASSWORD,
  },
  hooks: {
    "pages:extend"(pages) {
      // Funkcja pomocnicza do ustawiania middleware
      function setMiddleware(pages: any[]) {
        for (const page of pages) {
          // Przykład: ustaw middleware dla ścieżek zaczynających się od '/admin' lub '/nowe-wydarzenie'
          if (
            page.path.startsWith("/admin") ||
            page.path === "/nowe-wydarzenie"
          ) {
            page.meta ||= {};
            page.meta.middleware = ["auth"]; // Przypisz middleware 'auth'
          }

          // Rekurencyjnie ustaw middleware dla stron dzieci
          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }

      // Zastosuj middleware do wszystkich stron
      setMiddleware(pages);
    },
  },
  compatibilityDate: "2024-08-03",
});
