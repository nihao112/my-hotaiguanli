const state = {
  ShenSuoKuang: true
}
const mutations = {
  ZheDie(state) {
    state.ShenSuoKuang = !state.ShenSuoKuang
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
