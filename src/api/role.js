import axios from '@/utils/request.js'
// 获取所有角色
export const getAllRole = () => {
  // axios请求
  return axios.request({
    url: '/role/list',
    method: 'get'
  })
}
//  获取指定角色的权限
export const getPermissionByRoleId = (roleId) => {
  // axios请求
  return axios.request({
    url: '/role/permission/' + roleId,
    method: 'get'
  })
}
// 为用户分配权限
export const updatePermissionByRoleId = ({ permissions, roleId }) => {
  // axios请求
  return axios.request({
    url: '/role/distribute-permission/',
    method: 'post',
    data: { permissions, roleId }
  })
}
