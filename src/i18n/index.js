import { createI18n } from 'vue-i18n'
// 引入vuex
import store from '@/store/index.js'
// 引入中英语言包
import zh from './lang/zh'
import en from './lang/en'
// 1.定义数据中英数据
const messages = {
  zh: { ...zh },
  en: { ...en }
}

// 2.定义语言的类型 这里必须要let声明用别的后期改不了
const locale = store.getters.language || 'en'

// 3.初始化
const i18n = createI18n({
  legacy: false, // 要配合vue3.2compostion API
  globalInjection: true, // 全局注册一个t函数
  locale,
  messages
})
export default i18n
