// 用户鉴权 路由守卫
import router from './router/index'
import store from './store/index'
// 加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: true })

// 进入每一个页面之前先执行一下钩子
// 当用户未登录时，只能进入 login 页面
// 用户登录后 token 未过期之前，不允许进入 login 页面
const whiteRouter = ['/login']
router.beforeEach(async (to, from, next) => {
  document.title = '后台管理'
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 登录成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断有没有用户的信息 就去发送axios
        // 1.获取该用户的所有权限
        const { permission: { menus } } = await store.dispatch('user/hasUserInfo')
        // 2.根据权限比对私有路由 获取该用户能访问的路由
        const filtersRouter = await store.dispatch('userPermission/filterPrivateRoutes', menus)
        // 3.将获取过滤后的该用户的私有路由 动态添加到路由表中
        filtersRouter.forEach(activeRoute =>
          router.addRoute(activeRoute)
        )
        next(to.path)
      }
      // 首次登录后 跳转到首页
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
  // 设置进度条百分比
  NProgress.set(0.4)
  // 设置进度条
  NProgress.configure({ ease: 'ease', speed: 1100 })
  // 进度条结束
  NProgress.done()
})

router.afterEach(() => {
  // 防止页面不经过导航守卫结尾处 导致进度条无法走完
  NProgress.done()
})
