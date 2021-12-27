import axios from '@/utils/request.js'
// 获取所有角色
export const getAllRole = () => {
  // axios请求
  return axios.request({
    url: '/role/list',
    method: 'GET'
  })
}
//  获取指定角色的权限
export const getPermissionByRoleId = (roleId) => {
  // axios请求
  return axios.request({
    url: `/role/permission/${roleId}`,
    method: 'GET'
  })
}
// 为用户分配权限
export const updatePermissionByRoleId = ({ permissions, roleId }) => {
  // axios请求
  return axios.request({
    url: '/role/distribute-permission/',
    method: 'POST',
    data: { permissions, roleId }
  })
}
