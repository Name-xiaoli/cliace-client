<template>
  <div class="common-layout">
    <el-container class="all_container">
      <el-header>
        <div class="logo">cliace</div>
        <el-menu :default-active="$route.path" router class="el-menu" mode="horizontal">
          <el-menu-item class="el-menu-demo" index="/blog">博客</el-menu-item>
          <el-menu-item class="el-menu-demo" index="/log">日记</el-menu-item>
          <el-menu-item class="el-menu-demo" index="/my-blog">我的博客</el-menu-item>
          <el-menu-item class="el-menu-demo" index="/my-log">我的日记</el-menu-item>
        </el-menu>
        <div class="userInfo">
          <el-dropdown @command="handleCommand">
            <el-button round>
              {{ name }}
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changeUserInfo" type="text">修改个人信息</el-dropdown-item>
              <el-dropdown-item divided command="changePWD">修改账户密码</el-dropdown-item>
              <el-dropdown-item divided command="exit">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main><router-view></router-view></el-main>
      <el-drawer :title="title" :visible.sync="dialog" :direction="direction" :before-close="handleClose">
        <div>
          <el-form v-if="isUserInfo" :model="userInfoForm">
            <el-form-item label="用户名" label-width="80px">
              <el-input v-model="userInfoForm.login_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="昵称" label-width="80px">
              <el-input v-model="userInfoForm.nickname" ></el-input>
            </el-form-item>
            <el-form-item label="年龄" label-width="80px">
              <el-input v-model="userInfoForm.age" ></el-input>
            </el-form-item>
            <el-form-item label="性别" label-width="80px">
              <el-select v-model="userInfoForm.sex" placeholder="请选择你的性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form v-else :model="changePwdForm">
            <el-form-item label="用户名" label-width="80px">
              <el-input v-model="changePwdForm.login_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" label-width="80px">
              <el-input v-model="changePwdForm.passworsd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-width="80px">
              <el-input v-model="changePwdForm.newpassword"></el-input>
            </el-form-item>
          </el-form>
          <div class="drawer-foot">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="handleClose" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { changeUserInfoService, changePwdService } from '@/api/user'
export default {
  name: 'LayoutIndex',
  computed: { ...mapState('m_user', ['id', 'nickname', 'age', 'sex']) },
  data () {
    return {
      name: '',
      // 抽屉显示
      dialog: false,
      // 抽屉反向
      direction: 'rtl',
      // 抽屉标题
      title: '',
      // 抽屉内容(修改个人信息/修改账户密码)
      isUserInfo: true,
      loading: false,
      // 修改个人信息
      userInfoForm: {
        login_name: '',
        sex: '',
        nickname: '',
        age: ''
      },
      // 修改账户密码
      changePwdForm: {
        login_name: this.name,
        passworsd: '',
        newpassword: ''
      }
    }
  },
  mounted () {
    this.name = localStorage.getItem('name')
    this.userInfoForm.login_name = this.name
    this.userInfoForm.sex = this.sex
    this.userInfoForm.nickname = this.nickname
    this.userInfoForm.age = this.age
    this.changePwdForm.login_name = this.name
  },
  methods: {
    ...mapMutations('m_user', ['setUserInfo']),
    handleCommand (command) {
      if (command === 'changeUserInfo') {
        // 修改个人信息
        this.isUserInfo = true
        this.title = '修改个人信息'
        this.dialog = true
        // console.log(command, this.dialog)
      } else if (command === 'changePWD') {
        // 修改账户密码
        this.isUserInfo = false
        this.title = '修改账户密码'
        this.dialog = true
        // console.log(command, this.dialog)
        console.log(command)
      } else if (command === 'exit') {
        // 退出账号
        console.log(command)
        this.$confirm('确定退出该账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('name')
          window.location.reload()
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
      }
    },
    handleClose () {
      if (this.loading) {
        return
      }
      const text = this.isUserInfo ? '修改个人信息' : '修改账户密码'
      this.$confirm('确定要' + text + '吗？')
        .then(async _ => {
          if (this.isUserInfo === true) {
            this.loading = true
            const res = await changeUserInfoService(this.id, this.userInfoForm)
            console.log(res)

            if (res.data.code === 200) {
              this.userInfoForm.id = this.id
              this.loading = false
              this.setUserInfo(this.userInfoForm)
            }
            this.dialog = false
          } else {
            this.loading = true
            const res = await changePwdService(this.changePwdForm)
            console.log(res)
            if (res.data.code === 200) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              this.changePwdForm.passworsd = ''
              this.changePwdForm.newpassword = ''
              this.loading = false
            } else if (res.data.code === 400) {
              this.$notify({
                title: '提示',
                message: res.data.message,
                duration: 0
              })
              this.changePwdForm.passworsd = ''
              this.changePwdForm.newpassword = ''
              this.loading = false
              return
            }
            this.dialog = false
          }
        })
        .catch(_ => {})
    },
    cancelForm () {
      this.dialog = false
    }
  }
}

</script>

<style scoped lang="scss">
.common-layout {
  .all_container {
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-menu {
        width: 80%;

        .el-menu-demo {
          width: 25%;
          font-size: 18px;
          font-weight: bolder;
          text-align: center;
        }
      }

      .userInfo {
        float: right;
      }
    }
  }
}

.logo {
  font-family: "华文彩云";
  /*设置字体*/
  font-size: 32px;
  /*设置字体大小*/
  font-weight: bolder;
  /*设置字体粗细*/
  -webkit-text-stroke: 1px #0000FF;
  /*文字描边*/
  -webkit-text-fill-color: transparent;
  /*设置文字的填充颜色*/
  margin: 0 40px 0 20px;
}

.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* 确保 header 在最上层 */
}

.el-container {
  padding-top: 60px;
  /* 根据 header 的高度调整 */
}

.drawer-foot{
  display: flex;
  justify-content: space-around;
  margin-top: 10Vh;
}
</style>
