import { setItem, getItem } from '@/utils/storage.js'
import { MYCOLOR } from '@/commom/commom.js'
export default {
  namespaced: true,
  state: {
    myColor: getItem(MYCOLOR) || 'black'
  },
  mutations: {
    // 设置主题色
    setMycolor(state, color) {
      setItem(MYCOLOR, color)
      state.myColor = color
    }
  }
}