import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import Blog from '@/views/layout/blog.vue'
import Log from '@/views/layout/log.vue'
import MyBlog from '@/views/layout/myBlog.vue'
import MyLog from '@/views/layout/myLog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/blog',
    meta: { requiresAuth: true }, // 需要身份验证的路由
    children: [
      { path: '/blog', component: Blog },
      { path: '/log', component: Log },
      { path: '/my-blog', component: MyBlog },
      { path: '/my-log', component: MyLog }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('name') // 从 localStorage 获取 name 判断认证状态

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // 如果要访问的路由需要身份验证且用户未登录
    next({ path: '/login' }) // 重定向到登录页面
  } else {
    next() // 确保要调用 next()
  }
})

export default router
