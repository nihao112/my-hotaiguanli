import axios from '@/utils/request.js'
// 获取用户列表数据 post-->data:{} get--->params:{}
export const getUser = (data) => {
  // axios请求
  return axios.request({
    url: '/user-manage/list',
    method: 'get',
    params: data
  })
}
// excel批量插入
export const addUserByExcel = (data) => {
  // axios请求
  return axios.request({
    url: '/user-manage/batch/import',
    method: 'post',
    data
  })
}
// 删除操作
export const deleteUser = (id) => {
  return axios.request({
    url: `/user-manage/detele/${id}`,
    method: 'get'
  })
}
// 获取所有数据
export const getAllUser = () => {
  return axios.request({
    url: '/user-manage/all-list',
    method: 'get'
  })
}
// 用户详情
export const userDetailById = (id) => {
  return axios.request({
    url: '/user-manage/detail/' + id,
    method: 'get'
  })
}
