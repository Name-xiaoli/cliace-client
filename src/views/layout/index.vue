<template>
  <div class="common-layout">
    <el-container class="all_container">
      <el-header>
        <div class="logo">cliace</div>
        <el-menu :default-active="$route.path" router class="el-menu" mode="horizontal" @select="handleSelect">
          <el-menu-item class="el-menu-demo" index="/blog">博客</el-menu-item>
          <el-menu-item class="el-menu-demo" index="/log">日记</el-menu-item>
          <el-menu-item class="el-menu-demo" index="/my-blog">我的博客</el-menu-item>
          <el-menu-item class="el-menu-demo" index="/my-log">我的日记</el-menu-item>
        </el-menu>
        <div class="userInfo">
          <el-dropdown>
            <el-button round>
              {{ login_name }}
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改个人信息</el-dropdown-item>
              <el-dropdown-item divided>修改账户密码</el-dropdown-item>
              <el-dropdown-item divided>退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  computed: { ...mapState('m_user', ['login_name', 'id']) },
  data () {
    return {

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
</style>
