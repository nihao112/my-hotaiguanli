// 分装token
import axios from 'axios'
// 导入element-plus弹窗插件
import { ElMessage } from 'element-plus'
// 导入store
import store from '@/store/index'
// 导入token封装过期时间
import { isCheckTimeOut } from './auth'
const server = axios.create({
  timeout: 90000,
  baseURL: '/api'
})
// 错误处理 服务器返回错误提示
// 配置响应处理
server.interceptors.response.use(
  (response) => {
    const { success, data, message } = response.data
    if (success) {
      // 数据回来让加载按钮动画消失
      store.commit('user/load_', false)
      return data
    } else {
      store.commit('user/load_', false)
      ElMessage({
        type: 'error',
        message: message
      })
    }
    return Promise.reject(new Error(message))
  },
  (error) => {
    // token失效code==401单点登录 后台会返回特定的状态码 执行退出
    if (error.response && error.response.data && error.response.data.code === 401) {
      store.dispatch('user/logout')
    }
    // 服务器没有返回数据或者服务器位置错误
    store.commit('user/load_', false)
    ElMessage({
      type: 'error',
      message: error
    })
    return Promise.reject(error)
  }
)
// 配置请求拦截
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求的时候让加载按钮动画出现
  store.commit('user/load_', true)
  if (store.getters.token) {
    // 判断token时间触发过期
    if (!isCheckTimeOut()) {
      //  token过期后执行退出
      store.dispatch('user/logout')
      // 不应该执行
      return Promise.reject(new Error('token过期'))
    }
    // 携带一个国际化语言的参数
    if (store.getters.language) {
      config.headers['Accept-Language'] = store.getters.language
    }
    // 不需要登录（不需要token）就能访问接口 白名单
    config.headers.Authorization = `Bearer ${store.getters.token} `
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 导出一个对象
export default server
