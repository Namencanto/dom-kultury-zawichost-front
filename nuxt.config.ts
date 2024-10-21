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

  content: {
    contentHead: false,
  },

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
  app: {
    head: {
      titleTemplate: "%s - Miejsko-Gminny Ośrodek Kultury",
      title: "Dom Kultury Zawichost",
      htmlAttrs: {
        lang: "pl",
      },
      meta: [
        {
          name: "description",
          content:
            "Dom Kultury w Zawichoście - wydarzenia, warsztaty, i kultura dla wszystkich.",
        },
        {
          name: "keywords",
          content:
            "dom kultury, Zawichost, wydarzenia, kultura, warsztaty, sztuka",
        },
        {
          name: "author",
          content: "Mateusz Ordon | https://www.linkedin.com/in/mateusz-ordon",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charset: "UTF-8" },
      ],
      link: [
        { rel: "icon", type: "image/jpeg", href: "/logo.jpg" },
        { rel: "apple-touch-icon", href: "/logo.jpg" },
        {
          rel: "author",
          href: "https://www.linkedin.com/in/mateusz-ordon/",
        },
      ],
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
  compatibilityDate: "2024-10-22",
});
