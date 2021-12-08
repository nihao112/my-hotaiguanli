import axios from '@/utils/request.js'
// 获取所有权限列表
export const getAllpermissions = (data) => {
  // axios请求
  return axios.request({
    url: '/permission/list',
    method: 'get'
  })
}
