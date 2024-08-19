<template>
  <div class="bg" :style="{minHeight:height+'px'}">
    <div class="container">

    </div>
  </div>
</template>

<script >
export default {
  name: 'LookBlog',
  computed: {

  },
  watch: {
    height: {
      handler (a, b) {
        // console.log(a, b)

        if (a === 0) {
          // this.getHeight()
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      height: 0
    }
  },
  methods: {
    getHeight () {
      // console.log(document.body.clientHeight)

      this.height = document.body.clientHeight
    }

  },
  created () {
    this.getHeight()

    window.addEventListener('resize', this.getHeight) // 监听窗口大小变化
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getHeight) // 清除监听
  }

}
</script>

<style scoped lang="scss">
.bg{
  background-color: #f0f0f0;
  width: 100%;
  max-width: 100vw;

  display: flex;
  justify-content: center;

  .container{
    margin: 10px 0;
    width: 50%;
    background-color: #fff;
    border-radius:10px;
  }
}
</style>
