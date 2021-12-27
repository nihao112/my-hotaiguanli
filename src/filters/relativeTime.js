import i18n from '@/i18n/index.js'
import dayjs from 'dayjs'
// 时间的相对处理插件
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'
// dayjs使用rt
dayjs.extend(rt)
export default (val) => {
  if (!isNaN(val)) {
    return dayjs().locale(store.getters.language === 'zh' ? 'zh-cn' : 'en').to(dayjs(parseInt(val)))
  } else {
    return i18n.global.t('excel.nodateFormate')
  }
}
