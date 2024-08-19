import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import moduleUser from './user.js'
import moduleBlog from './blog.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    m_user: moduleUser,
    blog: moduleBlog
  },
  plugins: [createPersistedState()] // 使用插件
})
