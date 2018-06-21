import Vuex from 'vuex'

import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      isLoading: true,
      isSmartPhone: true,
      pageTitle: null,
      navi: {
        all: [],
        list: [],
        currentPos: [],
        width: [],
      },
      params: [],

      api: {
        wpDomain: 'https://www.gcrest.com',
        wpDomain2nd: 'http://ontest.heteml.jp/gcrest/wp',

        top: {
          news: {
            api: '/wp-json/wp/v2/posts?categories=3,2,5&per_page=10&/wp-json/wp/v2/recruit_cat?_embed',
            posts: [],
          }
        },
        // about: [],
        // service: [],
        recruit: {
          allCat: {
            api: '/wp-json/wp/v2/recruit_cat?_embed',
            items: [],
          },
          post: {
            api: '/wp-json/wp/v2/recruits/',
            post: []
          }
        },
        news: {
          all: {
            api: '/wp-json/wp/v2/posts?categories=3,2,5&_embed&per_page=8',
            head: [],
            posts: [],
          },
          topics: {
            api: '/wp-json/wp/v2/posts?categories=2,5&_embed&per_page=8',
            head: [],
            posts: [],
          },
          pressRelease: {
            api: '/wp-json/wp/v2/posts?categories=3&_embed&per_page=8',
            head: [],
            posts: [],
          },
          post: {
            api: '/wp-json/wp/v2/posts/',
            post: [],
          },
            // newRelease: {
            //   api: '/wp-json/wp/v2/posts?categories=2',
            //   head: [],
            //   posts: [],
            // },
            // topics: {
            //   api: '',
            //   head: [],
            //   posts: [],
            // },
        },
      },
    },
    actions: {
      isSmartPhone ({commit}) {
        let windowSize = () => {
          if (window.innerWidth < 769) {
            commit('IS_SMARTPHONE', true)
          } else {
            commit('IS_SMARTPHONE', false)
          }
        }
        windowSize()
        window.addEventListener('resize', windowSize)
      },
      getPageTitle ({commit}) {
        let getCurrent = () => {
          var current = $nuxt.$route.path
          var currentPos = $nuxt.$store.state.navi.list.indexOf(current)
          commit('PAGE_TITLE', current)
          commit('NAVI_CURRENT_POS', currentPos)

          // if (currentPos > -1) {
          //   commit('PAGE_TITLE', current)
          //   commit('NAVI_CURRENT_POS', currentPos)
          // }
          // else {
          //   let path = current.split('/')
          //   let parent_path = '/' + path[path.length - 2]
          //   let currentPos = $nuxt.$store.state.navi.list.indexOf(parent_path)
          //   commit('PAGE_TITLE', parent_path)
          //   commit('NAVI_CURRENT_POS', currentPos)
          // }
        }

        getCurrent()
        commit('PARAMS_QUERY', $nuxt.$route.params)

        if ($nuxt.$route.path !== $nuxt.$store.state.pageTitle) getCurrent()
      }
    },
    mutations,
  })
}

export default createStore
