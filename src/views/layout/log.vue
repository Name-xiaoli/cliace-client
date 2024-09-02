<template>
  <div class="flex-container">
    <div
      class="flex-item"
      @click="openDrawer(item)"
      v-for="(item, index) in allLog"
      :key="index"
    >
      <div>
        {{ item.user.nickname ? item.user.nickname : item.user.login_name }}
        <hr />
      </div>

      <div class="main">{{ item.text }}</div>

      <div>
        <hr />
        {{
          new Date(item.create_time).toLocaleString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <el-card class="box-card" shadow="always">
        <div slot="header" >
          <span>{{ drawerContainer.user.nickname?drawerContainer.user.nickname:drawerContainer.user.login_name }}</span>
        </div>
        <div>
          {{ drawerContainer.text }}
        </div>
        <div style="float: right;padding: 20px; font-size: 12px ;">
          {{
          new Date(drawerContainer.create_time).toLocaleString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
        </div>

      </el-card>
    </el-drawer>
  </div>
</template>

<script >
import { findAllLogService } from '@/api/log'
export default {
  name: 'LogIndex',
  data () {
    return {
      allLog: [],
      drawer: false,
      drawerContainer: {
        create_time: '',
        id: '',
        isPublic: '',
        text: '',
        updata_time: '',
        user: ''
      }
    }
  },
  methods: {
    // 得到所有日记信息
    async getAllLog () {
      const res = await findAllLogService()
      // console.log(res)
      this.allLog = res.data
    },
    openDrawer (event) {
      this.drawer = true
      this.drawerContainer = { ...event }
      console.log(this.drawerContainer)
    }
  },
  created () {
    this.getAllLog()
  }
}
</script>

<style scoped lang="scss">
.flex-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* 允许换行 */
  gap: 10px; /* 项目之间的间隔 */
}

.flex-item {
  background-color: #f0f0f0; /* 背景颜色 */
  border: 1px solid #dcdfe6; /* 边框 */
  border-radius: 6px; /* 圆角 */
  padding: 10px; /* 内边距 */
  min-width: 150px; /* 最小宽度 */
  max-width: calc(33% - 10px); /* 最大宽度，减去间隔 */
  box-sizing: border-box; /* 包含边框和内边距在宽度计算中 */

  display: flex;
  flex-direction: column; /* 垂直方向排列 */
  height: 180px; /* 占满视口高度 */

  .main {
    flex: 1; /* 中部内容自适应占据剩余空间 */
    display: -webkit-box; /* 必须要加 */
    -webkit-box-orient: vertical; /* 设置为垂直方向 */
    -webkit-line-clamp: 4; /* 显示的行数（根据需要调整行数） */
    overflow: hidden; /* 溢出隐藏 */
    text-overflow: ellipsis; /* 溢出时显示省略号 */
  }
}

.box-card {
  width: 80%;
  margin: 20px auto;
}
</style>
