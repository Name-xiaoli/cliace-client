import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局导入element-ui
import ElementUI from 'element-ui'
// 样式文件需要单独引入
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
