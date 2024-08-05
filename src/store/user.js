export default {
  // 开启命名空间
  namespaced: true,
  state: {
    id: null,
    login_name: '',
    nickname: '',
    age: null,
    sex: ''
  },
  mutations: {
    setUserInfo (state, data) {
      state.id = data.id
      state.login_name = data.login_name
      state.nickname = data.nickname
      state.age = data.age
      state.sex = data.sex
    },
    saveLoginNameToStorage (state) {
      localStorage.setItem('name', state.login_name)
    }
  }
}
