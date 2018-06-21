const mutations = {
  IS_LOADING (state, value) {
    state.isLoading = value
  },
  IS_SMARTPHONE (state, value) {
    state.isSmartPhone = value
  },
  PAGE_TITLE (state, value) {
    state.pageTitle = value
  },
  NAVI_ALL (state, value) {
    state.navi.all = value
  },
  NAVI_LIST (state, value) {
    state.navi.list = value
  },
  NAVI_CURRENT_POS (state, value) {
    state.navi.currentPos = value
  },
  NAVI_ITEM_WIDTH (state, value) {
    state.navi.width = value
  },
  PARAMS_QUERY (state, value) {
    state.params = value
  },

  // POSTS
  API_TOP_NEWS_POSTS (state, value) {
    state.api.top.news.posts = value
  },

  API_RECRUIT_ALLCAT_ITEMS (state, value) {
    state.api.recruit.allCat.items = value
  },
  API_RECRUIT_POST_POST (state, value) {
    state.api.recruit.post.post = value
  },

  API_NEWS_ALL_HEAD (state, value) {
    state.api.news.all.head = value
  },
  API_NEWS_ALL_POSTS (state, value) {
    state.api.news.all.posts = value
  },

  API_NEWS_TOPICS_HEAD (state, value) {
    state.api.news.topics.head = value
  },
  API_NEWS_TOPICS_POSTS (state, value) {
    state.api.news.topics.posts = value
  },

  API_NEWS_PRESS_HEAD (state, value) {
    state.api.news.pressRelease.head = value
  },
  API_NEWS_PRESS_POSTS (state, value) {
    state.api.news.pressRelease.posts = value
  },

  API_NEWS_POST_POST (state, value) {
    state.api.news.post.post = value
  },
}

export default mutations
