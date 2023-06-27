<!--
 * @Date: 2023-06-27 09:33:02
 * @LastEditors: with-the-winds
 * @LastEditTime: 2023-06-27 15:40:49
 * @Description: 头部注释
 * @FilePath: \own_tools\src\App.vue
-->
<template>
  <aside>
      <div
        v-for="item in asideList" 
        :key="item.link" 
        :title="item.label"
        @click="handlePath(item.link)"
        :class="{'actived': activedPath === item.link,'no-select': true}"
      >{{ item.label }}
    </div>
  </aside>

  <div class="content">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asideList: [{
        label: '首页',
        link: '/'
      }, {
        label: 'RGB与十六进制颜色码转换',
        link: '/color/RGBToHex'
      }],
      activedPath: '/'
    }
  },
  mounted() {
    // 从本地存储中获取导航项
    this.activedPath = localStorage.getItem('selectedNavItem') || ''
  },
  methods: {
    handlePath(path) {
      this.activedPath = path
      this.$router.push(path)
      // 将导航保存到本地存储
      localStorage.setItem('selectedNavItem', path)
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: flex-start;
}
</style>

<style lang="scss" scoped>
// 侧边栏
aside {
  width: 200px;
  height: 100vh;
  overflow-y: auto;
  border-right: 2px solid var(--border-color);
  font-size: 14px;
  div {
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 6px;
    padding-right: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      background-color: var(--border-color);
    }
  }
  .actived {
    color: var(--main-color);
    font-weight: bolder;
  }
}
// 内容栏
.content {
  width: calc(100% - 200px);
  min-width: 500px;
  height: 100vh;
  overflow-y: auto;
  font-size: 14px;
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
