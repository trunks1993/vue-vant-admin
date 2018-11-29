<template>
  <div class="personal-container">
    <div class="header">
      <div class="wrapper">
        <div class="img-box"><img :src="userInfo.avatar" /></div>
          <div class="userinfo-box">
            <div class="nickname-box">
              <span class="name">{{ userInfo.name }}</span>
              <span class="tag" v-if="userInfo.role">{{ userInfo.role.roleName }}</span>
            </div>
            <div v-if="userInfo.parent">
              上级：{{ userInfo.parent.name }} | 级别：{{
              userInfo.parent.role.roleName
              }}
            </div>
          </div>
        </div>
      </div>
      <van-row>
        <van-col span="6" v-for="(m, i) in menus" :key="i">
          <div class="btn-item" @click="to(m.path)">
            <img :src="m.icon" width="28px" height="28px;">
            <span class="label">{{m.name}}</span>
          </div>
        </van-col>
      </van-row>
      <div class="line"></div>
      <div class="page-title">所有菜单</div>
      <van-row>
        <van-col span="6" v-for="(m, i) in menus2" :key="i">
          <div class="btn-item" @click="to(m.path)">
            <img :src="m.icon" width="28px" height="28px;">
            <span class="label">{{m.name}}</span>
          </div>
        </van-col>
      </van-row>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      menus: [
        { name: '扫码发货', icon: require('../../assets/scan.png') },
        { name: '我要下单', icon: require('../../assets/shopping.png') },
        { name: '代理查询', icon: require('../../assets/search.png') },
        { name: '在线客服', icon: require('../../assets/service.png') }
      ],
      menus2: [
        { name: '发展代理', icon: require('../../assets/develop.png'), path: '/personal/develop' },
        {
          name: '订单管理',
          icon: require('../../assets/order.png'),
          path: '/personal/order'
        },
        { name: '我的团队', icon: require('../../assets/team.png') },
        { name: '库存报表', icon: require('../../assets/table.png') },
        { name: '代理名片', icon: require('../../assets/card.png') },
        { name: '我的收入', icon: require('../../assets/income.png') },
        {
          name: '收货地址',
          icon: require('../../assets/address.png'),
          path: '/personal/address'
        },
        { name: '商品追索', icon: require('../../assets/qrcode.png') }
      ]
    }
  },
  methods: {
    to(path) {
      this.$router.push({ path })
    }
  }
};

</script>
<style lang="less" scoped>
.personal-container {
  .header {
    height: 150px;
    width: 100%;
    background: #c8b185;
    border-radius: 0 0 40% 0;
    box-sizing: border-box;
    padding: 65px 0 0 40px;
    font-size: 0;
    margin-bottom: 10px;

    .wrapper {
      text-align: left;

      .img-box {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .userinfo-box {
        height: 60px;
        display: inline-block;
        font-size: 14px;
        margin-left: 20px;
        color: #fff;

        .nickname-box {
          line-height: 30px;
          font-size: 0;

          .name {
            font-weight: bolder;
            font-size: 14px;
          }

          .tag {
            display: inline-block;
            border: 1px solid #fff;
            line-height: 14px;
            font-size: 14px;
            padding: 2px 5px;
            margin-left: 6px;
          }
        }
      }
    }
  }

  .line {
    width: 90%;
    margin: 10px auto;
    border-top: 2px solid rgba(0, 0, 0, 0.06);
  }

  .page-title {
    width: 90%;
    margin: auto;
    text-align: left;
    padding: 20px 0;
    color: #000;
    font-weight: bold;
    font-size: 18px;
  }

  .btn-item {
    padding: 10px 0;

    .label {
      display: block;
      font-size: 14px;
    }
  }
}

</style>
