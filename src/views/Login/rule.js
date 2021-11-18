// 登录密码输入值必须六位
export const valiPassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码必须六位'))
  } else {
    callback()
  }
}
