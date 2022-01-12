import store from '@/store'
// 定义权限指令
const checkoutPermission = (el, binding) => {
  // 获取全部权限
  const points = store.getters.userInfo.permission.points
  // 获取当前权限
  const value = binding.value
  //  过滤后的数据
  const index = points.findIndex((item) => item === value)
  // 有权限不处理
  if (index <= -1) {
  // 没有权限删除 删除该dom 父节点.removeChild(el)
    el.parentNode && el.parentNode.removeChild(el)
  }
}
export default {
  mounted (el, binding) {
    checkoutPermission(el, binding)
  },
  updated (el, binding) {
    checkoutPermission(el, binding)
  }
}
