export default defineNuxtConfig({
  modules: ['@nuxtjs/google-fonts', 'nuxt-mdi', 'nuxt-swiper', '@nuxt/image'],
  css: ["@/assets/styles/main.scss"],
  typescript: {
    strict: false,
    typeCheck: false
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL_PRODUCTION : process.env.API_BASE_URL,
    },
  },
  routeRules: {
    '/my': { redirect: '/my/glavnaya' },
    '/my/': { redirect: '/my/glavnaya' }
  },
  ssr: true,
  compatibilityDate: '2025-04-07',
});