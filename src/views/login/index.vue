<template>
  <div class="container">
    <div v-if="isLogin" class="content">
      <el-form ref="form" :model="loginForm">
        <el-form-item label="用户名" label-width="15%">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="15%">
          <el-input placeholder="请输入密码" v-model="loginForm.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" type="primary"
            @click="onSubmit">登录</el-button>
          <el-button style="float: right;" type="text" @click="toRegister"><i class="el-icon-right">去注册</i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="content">
      <el-form ref="form" :model="registerForm">
        <el-form-item label="用户名" label-width="15%">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="15%">
          <el-input placeholder="请输入密码" v-model="registerForm.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="QQ邮箱" label-width="15%">
          <el-input placeholder="请输入QQ邮箱" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item class="captcha-form-item" label="验证码" label-width="15%">
          <div class="no-wrap-text">
            <el-input style="width: 280px;" placeholder="请输入QQ邮箱验证码" v-model="registerForm.captcha"></el-input>
            <el-button style="margin-left: 20px;" plain :disabled="isDisabled" @click="getCaptcha">获取验证码</el-button>
          </div>

        </el-form-item>
        <el-form-item>
          <el-button style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" type="primary"
            @click="onRegister">注册</el-button>
          <el-button style="float: right;" type="text" @click="toLogin"><i class="el-icon-right">去登录</i></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLoginService, userGetCaptchaService, userRegisterService } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',
  data () {
    return {
      isLogin: true,
      isDisabled: false,
      loginForm: {
        username: '',
        pwd: ''
      },
      registerForm: {
        username: '',
        pwd: '',
        email: '',
        captcha: ''
      }
    }
  },
  methods: {
    ...mapMutations('m_user', ['setUserInfo', 'saveLoginNameToStorage']),
    // 登录
    async onSubmit () {
      // console.log(this.loginForm)
      const res = await userLoginService(this.loginForm)
      console.log(res)
      if (res.data.code === 200) {
        this.setUserInfo(res.data.data)
        this.saveLoginNameToStorage()
        this.$router.push('/')
      }
    },
    // 注册
    async onRegister () {
      try {
        const res = await userRegisterService(this.registerForm)
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.toLogin()
        } else if (res.data.code === 400) {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      } catch (error) {
        if (error) {
          this.$message({
            message: '用户名重复',
            type: 'error'
          })
        }
      }
    },
    // 去注册
    toRegister () {
      this.isLogin = false
    },
    // 去登录
    toLogin () {
      this.isLogin = true
    },
    // 获取验证码
    async getCaptcha () {
      const res = await userGetCaptchaService(this.registerForm.email)
      if (res.data.code === 200) {
        this.$message({
          message: '成功发送验证码，验证码长期有效',
          type: 'success'
        })
        this.isDisabled = true
        setTimeout(() => {
          this.isDisabled = false
        }, 1000 * 60)
      } else {
        this.$message({
          message: '请填写有效QQ邮箱',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100vw;
  min-height: 95vh;

  .content {
    width: 40%;

  }
}

.no-wrap-text {
  white-space: nowrap;
}
</style>
