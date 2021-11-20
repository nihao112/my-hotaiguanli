import { logins, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN, USER_INFO } from '@/commom/commom.js'
import router from '@/router/index.js'
import { setTimeSteap } from '@/utils/auth.js'
const state = {
  token: utils.getItem(TOKEN) || '',
  userInfo: utils.getItem(USER_INFO) || {}
}
const getters = {}
const mutations = {
  setTick(state, token) {
    state.token = token
    utils.setItem(TOKEN, token)
  },
  getUserInfo(state, value) {
    // 保存vuex
    state.value = value
    // 保存到本地存储上
    utils.setItem(USER_INFO, value)
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
  logout({ commit }) {
    console.log(router)
    // 清理用户信息
    commit('setTick', '')
    // 清理token用户返回信息
    commit('getUserInfo', {})
    // 跳转到登录页面
    router.push('/login')
  },
  // 请求用户数据
  hasUserInfo({ commit }) {
    // 发送ajax
    getUserInfo().then((res) => {
      commit('getUserInfo', res.username)
    }).catch((err) => {
      console.log(err)
    })
  }
}
export default {
  namespaced: true, // 导出是全局变量 namespaced: true为了防止导出是全局变量
  state,
  getters,
  actions,
  mutations
}
