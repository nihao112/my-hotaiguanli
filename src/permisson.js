// 用户鉴权 路由守卫
import router from './router/index'
import store from './store/index'
// 进入每一个页面之前先执行一下钩子
// 当用户未登录时，只能进入 login 页面
// 用户登录后 token 未过期之前，不允许进入 login 页面
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
