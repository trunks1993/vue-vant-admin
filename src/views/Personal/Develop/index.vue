<template>
  <div>
    <div class="btn-box">
      <van-tabs type="card">
        <van-tab title="发展代理">
          <div class="develop-title">
            生成下级代理链接
          </div>
          <van-button type="warning" size="large" @click="toShare('abc')">官方</van-button>
          <van-button type="default" size="large" @click="toShare('def')">董事</van-button>
          <van-button type="default" size="large" @click="toShare('ghi')">合伙人</van-button>
          <van-button type="default" size="large" @click="toShare('jkl')">天使</van-button>
        </van-tab>
        <van-tab title="代理审核">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item, i) in list" :key="i">
              <div class="review-item">
                <div class="review-item-user">
                  <img src="http://wx.qlogo.cn/mmopen/JnRrPCQD19KypNwocDJMoiagM3WHROBPicFZ0hVXGFHFmaFNYx3ic2Q73eibSDXLmDEmOCsYFcianK0FyYCYQRegjvIDtf0Lp6JUp/64">
                  <div class="review-item-user-info">
                    <span>{{item.nickname}}</span>
                    <span>{{item.phone}}</span>
                  </div>
                </div>
                <van-button size="mini" round type="danger">通过</van-button>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
        <van-tab title="升级审核">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item, i) in list" :key="i">
              <div class="review-item">
                <div class="review-item-user">
                  <img src="http://wx.qlogo.cn/mmopen/JnRrPCQD19KypNwocDJMoiagM3WHROBPicFZ0hVXGFHFmaFNYx3ic2Q73eibSDXLmDEmOCsYFcianK0FyYCYQRegjvIDtf0Lp6JUp/64">
                  <div class="review-item-user-info">
                    <span>{{item.nickname}}</span>
                    <span>{{item.phone}}</span>
                  </div>
                </div>
                <van-button size="mini" round type="danger">通过</van-button>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUrlToken } from '@/utils'
import Clipboard from 'clipboard'
const btnCopy = new Clipboard('btn')

export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      copyValue: 'hello world'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({ nickname: 'trunks' + i, phone: '18077778888' });
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    toShare(roleId) {
      // this.$router.push({path: '/personal/develop/share', query: { roleId }})
      window.location.href = '/personal/develop/share?roleId=' + roleId
    }
  }
}
</script>
<style lang="less" scoped>
.btn-box {
  padding: 15px;

  .develop-title {
    font-size: 16px;
    padding: 20px 0;
  }

  .van-button {
    margin: 10px 0;
  }

  .review-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-user {
      display: flex;

      img {
        width: 40px;
        height: 40px;
      }

      &-info {
        margin-left: 10px;

        span {
          display: block;
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>