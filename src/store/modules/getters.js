// 集中暴露vuex 各个模块需要暴露的属性和方法
import variables from '@/style/variables/variables.scss'
import { generateColor } from '@/utils/theme.js'
export default {
  token: (state) => state.user.token,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => {
    return {
      ...variables,
      ...generateColor(state.theme.myColor)
    }
  },
  zheDieTuBiao: (state) => state.app.ShenSuoKuang,
  language: (state) => state.app.language,
  Theme_color: (state) => state.theme.myColor,
  daohang: (state) => state.app.fullpast,
  currentSizes: (state) => state.app.size
}
