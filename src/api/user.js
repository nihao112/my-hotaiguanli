// 定义有关user的网络请求
import axios from '@/utils/request.js'
export const logins = (data) => {
  // axios请求
  return axios.request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户数据
export const getUserInfo = (data) => {
  // axios请求
  return axios.request({
    url: '/sys/profile',
    method: 'GET',
    data
  })
}
