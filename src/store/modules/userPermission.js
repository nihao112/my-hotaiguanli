// 引入私有路由
import { publicRoutes, PrivateRoutes } from '@/router/index.js'

// 用户权限
export default {
  namespaced: true,
  state: {
    // 保存用户所有的路由表 公有+私有
    routes: publicRoutes
  },
  mutations: {
    setPrivateRoutes: (state, newPRivateRouter) => {
      state.routes = [...publicRoutes, ...newPRivateRouter]
    }
  },
  actions: {
    filterPrivateRoutes: ({ commit }, menus) => {
      const routes_ = []
      // 过滤
      menus.forEach((name) => {
        routes_.push(...PrivateRoutes.filter((item) => item.name === name))
      })
      // routes_.push({ path: '/:pathMatch(.*)', redirect: '/404' })
      commit('setPrivateRoutes', routes_)
      return routes_
    }
  }
}
