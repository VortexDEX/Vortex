// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/eslint'
  ],

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false  // Disable type checking to avoid vue-tsc issues
  },

  // App configuration
  app: {
    head: {
      title: 'Vortex DEX',
      meta: [
        { charset: 'utf-8' },
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' 
        },
        { 
          name: 'description', 
          content: 'Vortex - A modern decentralized exchange platform' 
        },
        // PWA and mobile optimization
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Vortex DEX' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        // Security and performance
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'x-dns-prefetch-control', content: 'on' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Mobile icons
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.json' },
        // DNS prefetch
        { rel: 'dns-prefetch', href: '//assets.coingecko.com' }
      ]
    }
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // Tailwind CSS configuration
  tailwindcss: {
    viewer: false
  },

  // SSR configuration
  ssr: true,

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    
    // Public keys (exposed to client-side)
    public: {
      appName: 'Vortex DEX'
    }
  },

  // Security headers
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        }
      }
    }
  }
})
