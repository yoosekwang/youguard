// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    middleware: ['auth'],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:4000',
      // apiBase: 'https://youguard.net', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  css: ['~/assets/css/main.css', 'vue3-toastify/dist/index.css'],
  // ✅ SEO 및 인증 태그 추가
  app: {
    head: {
      title: '유가드넷 | YouGuard - 스마트 보안 솔루션 플랫폼',
      meta: [
        { name: 'robots', content: 'index,follow' },
        { name: 'description', content: '유가드넷 | YouGuard - 스마트 보안 솔루션 & 워터마크 보호 시스템.' },
        { name: 'author', content: 'YouGuard' },
        { name: 'keywords', content: '유가드넷, youguard, 보안 솔루션, 스마트 보안, 온라인 보안' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '유가드넷 | YouGuard - 스마트 보안 솔루션 플랫폼' },
        { property: 'og:description', content: '유가드넷 | YouGuard - 스마트 보안 솔루션 & 워터마크 보호 시스템.' },
        { property: 'og:url', content: 'https://youguard.net/' },
      ],
    },
  },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  i18n: {
    vueI18n: './i18n.config.js' // if you are using custom path, default
  }
});