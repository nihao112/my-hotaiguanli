import axios from '@/utils/request.js'
// 获取所有权限列表
export const getAllpermissions = () => {
  // axios请求
  return axios.request({
    url: '/permission/list',
    method: 'GET'
  })
}
