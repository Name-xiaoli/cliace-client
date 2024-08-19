<template>
  <div class="container">
    <div class="left">
      <!-- 左侧内容 -->
      <el-card>
        <div slot="header">
          <span>推荐博客</span>
          <el-button
            @click="refresh"
            circle
            type="primary"
            style="float: right; padding: 5px"
            icon="el-icon-refresh-right"
          ></el-button>
        </div>
        <!-- 博客卡片 -->
        <div class="ellipsis" v-for="item in recommendBlogList" :key="item.id">
          <router-link
            :to="{ path: '/lookblog', query: { id: item.id } }"
            class="clickable-text"
            >{{ item.title }}</router-link
          >
        </div>
      </el-card>
    </div>

    <div class="middle" ref="scrollableList" @scroll="saveScrollPosition">
      <!-- 中间内容，支持滚动 -->
      <div
        class="fixed-header"
        style="display: flex; align-items: center; justify-content: center"
      >
        <el-input
          placeholder="请输入你想搜索的内容"
          v-model="input"
          style="width: 300px; margin-right: 10px"
          @change="search"
        >
        </el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>

      <div class="scrollable-content"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <div
          class="box"
          @click="handleMouseDown(i.id)"
          v-for="i,index in blogList"
          :key="index"
        >
          <h3 style="padding: 0 10px">{{ i.title }}</h3>
          <hr style="width: 95%" />
          <div class="blog">
            {{i.text}}
          </div>
          <div style="padding: 0 10px; color: #333; text-align: end">
            <span>{{i.user.nickname?i.user.nickname:i.user.login_name}}</span> / <span>{{i.updata_time}}</span>
          </div>
        </div>
      </div>

      <p v-if="loading">加载中...</p>
      <p v-if="noMore">你已浏览约200条数据,请刷新！</p>
    </div>
    <div class="right">
      <!-- 右侧内容 -->
      <el-card>
        <div slot="header">
          <span>我的博客(最新)</span>
        </div>
        <!-- 博客卡片 -->
        <div class="ellipsis" v-for="item in myBlogList" :key="item.id">
          <router-link
            :to="{ path: '/lookblog', query: { id: item.id } }"
            class="clickable-text"
            >{{ item.title }}</router-link
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { blogTenService, myBlogTenService, vagueFindBlogService } from '@/api/blog'
export default {
  name: 'BlogIndex',
  computed: {
    ...mapState('blog', ['recommendBlogList', 'isflesh', 'tenBlogList', 'scrollPosition']),
    ...mapState('m_user', ['id']),
    // 是否所有博客都查询完了
    noMore () {
      return this.tenBlogList.length >= 200
    },
    // 所有博客都查询完了下拉失效
    disabled () {
      return this.isSearch ? true : this.loading || this.noMore
    }
  },
  data () {
    return {
      myBlogList: [], // 我的博客列表
      input: '', // 搜索内容
      isSearch: false, // 是否搜索
      // count: 10, // 测试用数据
      loading: false, // 加载中显示
      blogList: [] // 中间博客列表

    }
  },
  methods: {
    ...mapMutations('blog', ['setRecommendBlogList', 'changeIsFlesh', 'setTenBlogList', 'clearTenBlogList', 'setScrollPosition']),
    // 博客推荐
    async changeBlogList () {
      if (!this.isflesh) {
        console.log(1)
        this.changeIsFlesh()
        const res = (await blogTenService()).data
        this.setRecommendBlogList(res)
      }
    },
    // 刷新博客推荐
    refresh () {
      this.changeIsFlesh()
      this.changeBlogList()
    },
    // 获取我的最新十条数据
    async getMyBlogList () {
      const res = await (
        await myBlogTenService({ userId: this.id, page: 1 })
      ).data
      this.myBlogList = res
    },
    // search搜索博客
    async search () {
      if (this.input === '') {
        this.isSearch = false
      } else {
        this.isSearch = true
      }
      this.setScrollPosition(0)
      const res = await vagueFindBlogService(this.input)

      // console.log(res.data)
      this.blogList = res.data
    },
    // 判断是否正在选择文本
    handleMouseDown (id) {
      // 当鼠标按下时判断是否正在选择文本
      const selection = window.getSelection()
      if (selection.toString() === '') {
        // 如果没有选中的文本，则进行跳转
        this.clearTenBlogList()
        this.setTenBlogList(this.blogList)
        this.navigateToPage(id) // 传递参数
      }
    },

    // 点击跳转页面
    navigateToPage (id) {
      this.$router.push({
        path: '/lookblog',
        query: { id } // 在这里添加查询参数
      })
    },
    // 获取当前定位
    saveScrollPosition () {
      this.setScrollPosition(this.$refs.scrollableList.scrollTop)
      console.log(this.$refs.scrollableList.scrollTop)
    },
    handleBeforeUnload () {
      this.clearTenBlogList()
      this.setScrollPosition(0)
    },

    // 加载刷新出来的博客内容
    async load () {
      this.loading = true
      // setTimeout(() => {
      //   this.count += 80
      //   this.loading = false
      // }, 2000)

      try {
        const res = (await blogTenService()).data
        // console.log(res)
        this.blogList.push(...res)
        console.log(this.blogList)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  },
  created () {
    this.changeBlogList()
    this.getMyBlogList()
    // this.clearTenBlogList()
    // console.log(this.tenBlogList)
    if (this.tenBlogList) {
      this.blogList = this.tenBlogList
      // console.log(this.blogList)
    }
  },
  mounted () {
    // 恢复滚动位置

    this.$nextTick(() => {
      this.$refs.scrollableList.scrollTop = this.scrollPosition
    })

    // 添加 beforeunload 事件监听器
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  },
  beforeDestroy () {
    // 离开组件时保存滚动位置
    // this.saveScrollPosition()
    // console.log(this.scrollPosition)

    // 移除事件监听器
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  }

}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 85vh;
  /* 设置高度为视口高度 */
}

.left,
.right {
  width: 240px;
  /* 固定宽度 */
  background-color: #f0f0f0;
  /* 背景颜色 */
  padding: 5px;
  /* 内边距 */
}

.fixed-header {
  background-color: white; /* 固定头部的背景色 */
  color: white;
  padding: 0 10px 10px 10px;
  text-align: center;
  position: sticky; /* 或者使用 position: fixed; */
  top: 0; /* 固定在顶部 */
  z-index: 1; /* 确保在其他内容之上 */
}

.middle {
  flex: 1;
  /* 占据剩余空间 */
  overflow-y: auto;
  /* 启用垂直滚动条 */
  background-color: #ffffff;
  /* 背景颜色 */
  padding: 0 10px 0 10px;
  /* 内边距 */

  .search {
    display: flex;
  }
}

.scrollable-content {
  /* 模拟内容高度以便产生滚动条 */
  min-height: 70vh;
  margin: 8px;
  .box {
    width: 100%;
    height: 180px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 5px;

    .blog {
      padding: 0 10px;
      height: 84px;
      font-size: 14px;
      line-height: 2;
      // background-color: rebeccapurple;
      overflow: hidden;
      // text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}

.ellipsis {
  width: 200px;
  /* 设置固定宽度 */
  white-space: nowrap;
  /* 不允许换行 */
  overflow: hidden;
  /* 隐藏超出部分 */
  text-overflow: ellipsis;
  /* 使用省略号表示超出部分 */
  border-bottom: 1px solid #ccc;
  padding: 5px;

  /* 可选：内边距 */
  .clickable-text {
    color: black;
    /* 链接颜色 */
    cursor: pointer;
    /* 鼠标悬停时显示为手型 */
    text-decoration: none;
    /* 下划线 */
  }
}
</style>
