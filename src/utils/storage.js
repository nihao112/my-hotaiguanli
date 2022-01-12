// 存储数据
// 设置数据
const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取数据
const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    // 处理一个对象的字符串
    return JSON.parse(value)
  } catch (err) {
  // 处理一个不是对象的字符串
    return value
  }
}
// 处理单个删除
const deleteItem = (key) => {
  window.localStorage.removeItem(key)
}
const clearItem = () => {
  window.localStorage.clear()
}
export {
  setItem,
  getItem,
  deleteItem,
  clearItem
}
