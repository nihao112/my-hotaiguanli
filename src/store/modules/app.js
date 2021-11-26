import { setItem, getItem } from '@/utils/storage.js'
import { SHENSUO, LANGUAGR } from '@/commom/commom.js'
const state = {
  ShenSuoKuang: !getItem(SHENSUO),
  language: getItem(LANGUAGR) || 'zh'
}
const mutations = {
  ZheDie(state) {
    setItem(SHENSUO, state.ShenSuoKuang)
    state.ShenSuoKuang = !state.ShenSuoKuang
  },
  setLanguage(state, lang) {
    setItem(LANGUAGR, lang)
    state.language = lang
  }

}
export default {
  namespaced: true,
  state,
  mutations
}
