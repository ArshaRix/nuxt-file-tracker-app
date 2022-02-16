export default {
  head: {
    title: 'The Chronoa Project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/moment',
    '@nuxtjs/style-resources',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  axios: {
    baseURL: 'http://192.168.0.100:3000/',
  },

  build: {
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 604800
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/api/users/login', method: 'post'},
          logout: { url: '/api/users/logout', method: 'post'},
          user: { url: '/api/users/profile', method: 'get'},
        },
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/'
    },    
  },  

  serverMiddleware: [
    '~/api/app.js'
  ],

  styleResources: {
    scss: [
    '~/assets/styles/variables.scss',
    '~/assets/styles/mixins.scss',
    ]
  },

  loading: false,

  publicRuntimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    baseURL: process.env.BASE_URL,
  },

  privateRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
  },

  server: {
    host: '0.0.0.0',
  }  
}