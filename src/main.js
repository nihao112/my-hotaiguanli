import {
  createApp
} from 'vue'
import App from './App.vue'
// 引入router路由
import router from './router'
// 引入vuex
import store from './store'
// 引入样式的主入口文件
import './style/index/index.scss'
// element-plus注册引入
import installElementPlus from './plugins/element'
// 引入icon图标
import svgIconInit from './icons/index.js'

// 用户鉴权
import './permisson.js'
const app = createApp(App)
installElementPlus(app)
svgIconInit(app)
app.use(store).use(router).mount('#app')
