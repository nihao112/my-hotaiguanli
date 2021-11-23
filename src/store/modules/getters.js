// 集中暴露vuex 各个模块需要暴露的属性和方法
import variables from '@/style/variables/variables.scss'
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => variables,
  zheDieTuBiao: (state) => state.app.ShenSuoKuang
}
