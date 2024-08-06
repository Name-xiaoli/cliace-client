import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import moduleUser from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    m_user: moduleUser
  },
  plugins: [createPersistedState()] // 使用插件
})
