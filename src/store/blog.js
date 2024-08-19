
export default {
  // 开启命名空间

  namespaced: true,
  state: {
    isflesh: false,
    recommendBlogList: [],
    tenBlogList: [],
    scrollPosition: 0
  },
  mutations: {
    setRecommendBlogList (state, data) {
      state.recommendBlogList = data
    },
    setTenBlogList (state, data) {
      state.tenBlogList.push(...data)
    },
    clearTenBlogList (state) {
      state.tenBlogList = []
    },
    changeIsFlesh (state) {
      state.isflesh = !state.isflesh
    },
    setScrollPosition (state, data) {
      state.scrollPosition = data
    }
  },
  actions: {

  }
}
