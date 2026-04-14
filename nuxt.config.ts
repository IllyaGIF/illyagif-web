export default defineNuxtConfig({
  ssr: false,

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/tailwind.css',
  ],

  devtools: { enabled: true },

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  unocss: { nuxtLayers: true },

  googleFonts: {
    families: {
      'TikTok+Sans': [400, 500, 700],
    },
    display: 'swap',
    preload: true,
    download: true,
    inject: true,
  },

  compatibilityDate: '2024-11-13',

  modules: [
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],

  app: {
    baseURL: '/illyagif-web/',
    head: {
      script: [
        {
          src: 'https://code.iconify.design/iconify-icon/1.0.5/iconify-icon.min.js',
          defer: true,
        },
      ],
    },
  },

  nitro: {
    preset: 'github_pages',
  },
})
