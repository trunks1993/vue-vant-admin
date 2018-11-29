<template>
  <div>
    <div class="btn-box">
      <!-- <button-tab>
        <button-tab-item selected @on-item-click='onItemClick'>发展代理</button-tab-item>
        <button-tab-item @on-item-click='onItemClick'>代理审核</button-tab-item>
        <button-tab-item @on-item-click='onItemClick'>升级审核</button-tab-item>
      </button-tab> -->
    </div>
    <div class="develop-container" v-if="activityIndex === 0">
      <!-- <divider>生成下级代理链接</divider> -->
    </div>
    <div class="new-container" v-else-if="activityIndex === 1">
      1
    </div>
    <div class="level-develop-container" v-else>
      2
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activityIndex: 0
    }
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
  .btn-box {
    padding: 15px;
  }

</style>