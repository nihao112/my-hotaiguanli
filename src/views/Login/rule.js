// 登录密码输入值必须六位
import i18n from '@/i18n/index.js'
console.log(i18n)
export const valiPassword = (rule, value, callback) => {
  if (value !== '') {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('login.passwordRule')))
      return false
    } else if (
      /[^\d]/g.test(value)
      // !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!*#$%&_=])[A-Za-z\d@!*#$%&_=]{8,18}$/.test(value)
    ) {
      callback(new Error(i18n.global.t('login.passwordshuzi')))
      // callback(new Error('密码必须包含字母、数字和特殊字符(@!*#$%&_=)'))
      return false
    } else {
      callback()
    }
  } else {
    callback(new Error(i18n.global.t('login.passwordkong')))
  }
}

export const valiusername = (rule, value, callback) => {
  if (value.length <= 0) {
    callback(new Error(i18n.global.t('login.usernameRule')))
    return false
  } else {
    callback()
  }
}
