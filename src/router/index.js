import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/lindex.vue'
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

export default router
