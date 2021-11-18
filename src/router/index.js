import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/index.vue'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Daohang',
    component: () => import('../views/Daohang/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
