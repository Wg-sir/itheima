import Vue from 'vue'
import VueRouter from 'vue-router'
import { login } from '../api/user'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: login,
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    redirect: 'my',
    children: [
      {
        path: 'qa',
        component: () => import('@/views/Qa')
      },
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'my',
        component: () => import('@/views/My')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
