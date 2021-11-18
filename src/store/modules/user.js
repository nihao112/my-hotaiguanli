import { logins } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN } from '@/commom/commom.js'
const state = {
  token: utils.getItem(TOKEN) || ''
}
const getters = {}
const mutations = {
  setTick(state, token) {
    state.token = token
    utils.setItem(TOKEN, token)
  }
}
const actions = {
  // 获取密码信息
  login({ commit }, ruleForm) {
    const { password, username } = ruleForm
    return new Promise((resolve) => {
      logins({ password: md5(password), username })
        .then((res) => {
          commit('setTick', res.token)
          resolve()
        })
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
