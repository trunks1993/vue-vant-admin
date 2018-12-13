<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" v-if="path === '/' || path === '/answer' || path === '/personal'">
      <van-tabbar-item info="3" :to="{ path: '/' }">
        <span>首页</span>
        <i slot="icon" class="iconfont icon-home" />
      </van-tabbar-item>
      <van-tabbar-item :to="{ path: '/answer' }">
        <span>问答</span>
        <i slot="icon" class="iconfont icon-shu" />
      </van-tabbar-item>
      <van-tabbar-item :to="{ path: '/personal' }">
        <span>我的</span>
        <i slot="icon" class="iconfont icon-ziyuan" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  computed: {
    path() {
      return this.$route.path
    },
    active: {
      get: function() {
        return this.$route.path === '/' ? 0 : this.$route.path === '/answer' ? 1 : 2
      },
      set: function() {

      }
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a:-webkit-any-link {
  text-decoration: none;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.van-tabbar-item--active {
  color: #c8b185!important;
}
</style>