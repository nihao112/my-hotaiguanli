// 登录密码输入值必须六位
export const valiPassword = (rule, value, callback) => {
  if (value !== '') {
    if (value.length < 6) {
      callback(new Error('请输入至少6位的密码'))
      return false
    } else if (
      /[^\d]/g.test(value)
      // !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!*#$%&_=])[A-Za-z\d@!*#$%&_=]{8,18}$/.test(value)
    ) {
      callback(new Error('密码只能输入数字'))
      // callback(new Error('密码必须包含字母、数字和特殊字符(@!*#$%&_=)'))
      return false
    } else {
      callback()
    }
  } else {
    callback(new Error('密码不能为空'))
  }
}
