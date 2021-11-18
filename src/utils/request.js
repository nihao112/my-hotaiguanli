// 分装token
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 导入store
import store from '@/store/index'
const server = axios.create({
  timeout: 5000,
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
    // 服务器没有返回数据或者服务器位置错误
    ElMessage({
      type: 'error',
      message: '服务器请求异常'
    })
    return Promise.reject(error)
  }
)
// 不需要登录（不需要token）就能访问接口 白名单
// 配置请求拦截
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token} `
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 导出一个对象
export default server
