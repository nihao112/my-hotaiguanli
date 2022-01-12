import { setItem, getItem } from '@/utils/storage.js'
import { SHENSUO, LANGUAGR, DAOHANG } from '@/commom/commom.js'
const state = {
  ShenSuoKuang: !getItem(SHENSUO),
  language: getItem(LANGUAGR) || 'zh',
  fullpast: getItem(DAOHANG) || []
}
const mutations = {
  ZheDie(state) {
    setItem(SHENSUO, state.ShenSuoKuang)
    state.ShenSuoKuang = !state.ShenSuoKuang
  },
  setLanguage(state, lang) {
    setItem(LANGUAGR, lang)
    state.language = lang
  },
  // 数据
  daohang (state, tost) {
    const isFinf = state.fullpast.find(item => item.path === tost.path)
    if (!isFinf) {
      state.fullpast = [...state.fullpast, tost]
      setItem(DAOHANG, state.fullpast)
    }
  },
  // 更新fullpast中的每一个指定索引的title
  changeTitle (state, tagList) {
    state.fullpast = tagList
    setItem(DAOHANG, state.fullpast)
  },
  // 关闭业务
  closeTap (state, paylod) {
    switch (paylod.type) {
      // 关闭当前
      case 'index':
        state.fullpast.splice(paylod.index, 1)
        break
        // 关闭右侧
      case 'right':
        state.fullpast.findIndex(ite => state.fullpast.splice(state.fullpast.indexOf(paylod.item) + 1))
        break
        // 关闭其他
      case 'other':
        state.fullpast = [{ ...paylod.item }]
        break
    }
    setItem(DAOHANG, state.fullpast)
  }
}
const actions = {
  // 清理导航tog数据
  clearFullpast ({ commit, state }) {
    setItem(DAOHANG, [])
    // commit('daohang', [])
    commit('changeTitle', [])
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
