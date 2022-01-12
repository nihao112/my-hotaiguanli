import { logins, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN } from '@/commom/commom.js'
import router, { clearPrivateRoutes } from '@/router/index.js'
import { setTimeSteap } from '@/utils/auth.js'

const state = {
  token: utils.getItem(TOKEN) || '',
  // userInfo: utils.getItem(USER_INFO) || {},
  userInfo: {},
  load: false
}
const getters = {}
const mutations = {
  setTick(state, token) {
    state.token = token
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, value) {
    // 保存vuex
    state.userInfo = value
    // 保存到本地存储上
    // utils.setItem(USER_INFO, value)
  },
  load_ (state, load) {
    state.load = load
  }
}
const actions = {
  // 获取密码信息
  login({ commit }, ruleForm) {
    const { password, username } = ruleForm
    return new Promise((resolve) => {
      logins({ password: md5(password), username })
        .then((res) => {
          // 保存token 到vuex和本地储存中
          commit('setTick', res.token)
          // 记录token的获取时间
          setTimeSteap()
          resolve()
        })
    })
  },
  logout(context) {
    // 清理用户信息
    context.commit('setTick', '')
    // 退出后清理路由当前用户数据
    clearPrivateRoutes().then((res) => {
    // 清理token用户返回信息
      context.commit('setUserInfo', {})
    })
    // 清空权限和角色相关数据
    context.dispatch('roleAndPermission/clearRoleAndPermission', null, {
      root: true
    })
    // 清理导航tog数据
    context.dispatch('app/clearFullpast', null, {
      root: true
    })

    // 跳转到登录页面
    router.push('/login')
  },
  // 请求用户数据
  async hasUserInfo({ commit }) {
    // 发送ajax
    const res = await getUserInfo()
    commit('setUserInfo', res)
    return res
  }

}
export default {
  namespaced: true, // 导出是全局变量 namespaced: true为了防止导出是全局变量
  state,
  getters,
  actions,
  mutations
}
