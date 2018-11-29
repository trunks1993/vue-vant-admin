<template>
  <div>
    <van-nav-bar :title="isEdit?'修改地址':'新增地址'" left-text="返回" left-arrow v-if="isAdd || isEdit" @click-left="backToList"></van-nav-bar>
    <van-address-list v-model="chosenAddressId" :list="addressList" @add="onAdd" @edit="onEdit" v-if="!isAdd && !isEdit"/>
    <van-address-edit :addressInfo="addressInfo" :area-list="areaList" show-postal show-delete show-set-default show-search-result @save="onSave" @delete="onDelete" v-else/>
  </div>
</template>
<script>
import areaList from './area.js'
export default {
  data() {
    return {
      addressList: [{
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号'
      }],
      isEdit: false,
      isAdd: false,
      chosenAddressId: '1',
      areaList,
      addressInfo: ''
    }
  },
  methods: {
    backToList() {
      this.isAdd = this.isEdit = false
    },
    onAdd() {
      this.addressInfo = ''
      this.isAdd = true
    },
    onEdit(item) {
      this.addressInfo = item
      this.isEdit = true
    },
    onSave() {

    },
    onDelete() {

    }
  }
}
</script>
<style lang="less" scoped>
.content {
  padding: 10px;
  text-align: left;

  .contact {
    .phone {
      font-size: 12px;
      margin-left: 5px;
      color: #333333;
    }
  }

  .address {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 14px;
    line-height: 16px;
  }
}

.temp {
  height: 68px;
}

.footer {
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px;
}
</style>