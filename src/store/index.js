import { createStore } from 'vuex'
import user from './modules/user'
import getters from './modules/getters'
import app from './modules/app'
import theme from './modules/theme'
import roleAndPermission from './modules/roleAndPermission'
import userPermission from './modules/userPermission'
import setArticle from './modules/setArticle'
export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    roleAndPermission,
    userPermission,
    setArticle
  }
})
