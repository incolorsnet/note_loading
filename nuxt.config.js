const routerBaseFunc = () => {
  if (process.env.DEPLOY_ENV === 'GH_PAGES') {
    var path = '/note_nuxt/'
  } else if (process.env.DEPLOY_ENV === 'PROD') {
    var path = '/'
  } else {
    var path = '/'
  }

  let arr = { router: {
      base: path
    }
  }
  return arr
}

const dirFunc = () => {
  if (process.env.DEPLOY_ENV === 'GH_PAGES') {
    var dir = 'docs'
  } else if (process.env.DEPLOY_ENV === 'PROD') {
    var dir = 'dist_www'
  } else {
    var dir = 'dist_test'
  }

  let arr = { dir: dir }
  return arr
}

const routerBase = routerBaseFunc()
const dir = dirFunc()

let title = '株式会社ジークレスト'

const ogp = {
  title: 'nuxt',
  keywords: '',
  descript: '',
  image: '',
  url: '',
  type: 'article',
  card: 'summary_large_image',
}

module.exports = {
  ...routerBase,
  modules: [
    ['nuxt-sass-resources-loader', [
      '@/assets/css/_parts/_variables.scss',
      '@/assets/css/_parts/_function.scss',
    ]],
  ],
  css: ['@/assets/css/style.scss'],
  /*
  ** Headers of the page
  */
  head: {
    title: ogp.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: ogp.keywords },
      { hid: 'description', name: 'description', content: ogp.descript },
      { hid: 'og:title',
        name: 'og:title',
        content: ogp.title,
      },
      { hid: 'og:description',
        name: 'og:description',
        content: ogp.descript
      },
      { hid: 'og:url',
        name: 'og:url',
        content: ogp.url,
      },
      { hid: 'og:image',
        name: 'og:image',
        content: ogp.image,
      },
      { hid: 'og:type',
        name: 'og:type',
        content: ogp.type,
      },
      { hid: 'twitter:title',
        name: 'twitter:title',
        content: ogp.title,
      },
      { hid: 'twitter:description',
        name: 'twitter:description',
        content: ogp.descript
      },
      { hid: 'twitter:image',
        name: 'twitter:image',
        content: ogp.image,
      },
      { hid: 'twitter:card',
        name: 'twitter:card',
        content: ogp.card,
      },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Encode+Sans+Condensed' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  // loading: '~/components/loading.vue',
  // loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'gsap'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    // インラインCSSを外部ファイルにまとめる
    extractCSS: {
      allChunks: true
    },
  },
  plugins: [
    { src: '@/plugins/waypoints', ssr: false },
  ],
  generate: {
    ...dir,
    collapseWhitespace: false,
  },
}
