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

// 修改个人信息
export const changeUserInfoService = (id, data) => {
  return instance.patch(`/users?id=${id}&login_name=${data.login_name}`, {
    nickname: data.nickname,
    age: Number(data.age),
    sex: data.sex
  })
}

// 修改账户密码

export const changePwdService = (data) => {
  return instance.patch(`/users/changePWD?login_name=${data.login_name}&passworsd=${data.passworsd}`, {
    passworsd: data.newpassword
  })
}
