// 用户鉴权 路由守卫
import router from './router/index'
import store from './store/index'
// 进入每一个页面之前先执行一下钩子
// 当用户未登录时，只能进入 login 页面
// 用户登录后 token 未过期之前，不允许进入 login 页面
const whiteRouter = ['/login']
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 登录成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // alert(1)
        // 判断有没有用户的信息 就去发送axios
        await store.dispatch('user/hasUserInfo')
      }
      next()
    }
  } else {
    // 未登录
    if (whiteRouter.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
