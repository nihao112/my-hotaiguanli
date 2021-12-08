import {
  createApp
} from 'vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
// 引入router路由
import router from './router'
// 引入vuex
import store from './store'
// 引入样式的主入口文件
import './style/index/index.scss'
// 引入icon图标
import svgIconInit from './icons/index.js'
// 用户鉴权
import './permisson.js'
// 中英切换
import i18n from '@/i18n/index'
// 注册过滤全局属性
import initFilters from '@/filters'
// 注册指令
import initDirectives from '@/directives'
const app = createApp(App)
svgIconInit(app)
initFilters(app)
initDirectives(app)
app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
