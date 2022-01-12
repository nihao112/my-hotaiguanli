import * as local from './storage'
import {
  TIME_STAMP,
  TIME_OUT
} from '@/commom/commom.js'
// 设置token时间
export const setTimeSteap = () => {
  // 保存时间
  local.setItem(TIME_STAMP, Date.now())
}

//  获取保存token时间
const getTimeStamp = () => {
  return local.getItem(TIME_STAMP)
}

// check时间是否超时 true代表不过期 false代表过期
export const isCheckTimeOut = () => {
  // 判断 现在的时间-保存的时间>2小时
  const currentTime = Date.now()
  /* eslint-disable */ 
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp <= TIME_OUT
  /* eslint-enable */
}
