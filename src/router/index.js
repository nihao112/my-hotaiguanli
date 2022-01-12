import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/views/Layout/index.vue'
import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'
import PermissionList from './modules/PermissionList'
import RoleList from './modules/RoleList'
import UserManage from './modules/UserManage'
import store from '@/store'
// 私有路由
export const PrivateRoutes = [
  Article,
  ArticleCreate,
  PermissionList,
  RoleList,
  UserManage
]
// 公开路由表 任何权限的用户都能访问
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...publicRoutes]
})
export const clearPrivateRoutes = async() => {
  try {
    const { permission: { menus } } = store.getters.userInfo
    menus.forEach(name => { router.removeRoute(name) })
  } catch (err) {}
}
export default router
