import instance from '@/api/request'

// 登录接口
export const userLoginService = ({ username, pwd }) => {
  return instance.post('/users/login', { login_name: username, passworsd: pwd })
}

// 发送验证码
export const userGetCaptchaService = (email) => {
  return instance.post('/users/email', { email })
}

// 注册账号接口
export const userRegisterService = ({ username, pwd, email, captcha }) => {
  return instance.post('/users/regist', {
    login_name: username,
    passworsd: pwd,
    email: email,
    captcha: captcha
  })
}
