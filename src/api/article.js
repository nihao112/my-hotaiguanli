import axios from '@/utils/request.js'
// 文章
export const getAllarticle = (data) => {
  return axios.request({
    url: '/article/list',
    method: 'GET',
    params: data
  })
}
// 删除文章
export const removeArticle = (id) => {
  return axios.request({
    url: `/article/delete/${id}`,
    method: 'GET'
  })
}
// 创建文章
export const articleCreate = (data) => {
  return axios.request({
    url: '/article/create',
    method: 'POST',
    data
  })
}
// 查看文章详情
export const articleDetail = (id) => {
  return axios.request({
    url: `/article/${id}`,
    method: 'GET'
  })
}
// 修改文章排名
export const updateArticleRanking = (data) => {
  return axios.request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}
// 编辑文章详情
export const articleEdit = (data) => {
  return axios.request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
