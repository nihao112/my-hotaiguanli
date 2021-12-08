// 分装token
import axios from 'axios'
// 导入element-plus弹窗插件
import { ElMessage } from 'element-plus'
// 导入store
import store from '@/store/index'
// 导入token封装过期时间
import { isCheckTimeOut } from './auth'
// import { i18n } from '@/i18n/index.js'
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
      return data
    } else {
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
  if (store.getters.token) {
    // 判断token时间触发过期
    if (!isCheckTimeOut()) {
      //  token过期后执行退出
      store.dispatch('user/logout')
      // 不应该执行
      return Promise.reject(new Error('token过期'))
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
