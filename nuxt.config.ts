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
    "@nuxtjs/sitemap",
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

  image: {
    domains: [process.env.BASE_URL],
    quality: 80,
  },
  ogImage: {
    baseUrl: process.env.BASE_URL,
    defaults: {
      background: "#000",
      color: "#fff",
    },
  },

  hooks: {
    "pages:extend"(pages) {
      function setMiddleware(pages: any[]) {
        for (const page of pages) {
          if (
            page.path.startsWith("/admin") ||
            page.path === "/nowe-wydarzenie"
          ) {
            page.meta ||= {};
            page.meta.middleware = ["auth"];
          }

          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }

      setMiddleware(pages);
    },
  },
  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
  },
  compatibilityDate: "2024-08-03",
});
