<template>
  <div>
    <!-- <x-header
      :left-options="{ showBack: false }"
      :title="'经销商管理系统'"
    ></x-header>
    <swiper :list="slides" :auto="true" :loop="true"></swiper>
    <marquee>
      <marquee-item
v-for="i in 5"
:key="i" class="align-middle"
        >hello world {{ i }}</marquee-item
      >
    </marquee>

    <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="(m, i) in menus" :label="m.name" :key="i">
        <i slot="icon" class="iconfont icon-home" />
      </grid-item>
    </grid> -->
  </div>
</template>

<script>
// import { XHeader, Swiper, Marquee, MarqueeItem, Grid, GridItem } from 'vux'

export default {
  // components: {
  //   XHeader,
  //   Swiper,
  //   Marquee,
  //   MarqueeItem,
  //   Grid,
  //   GridItem
  // },
  // data() {
  //   return {
  //     slides: [
  //       { img: 'http://shouquan.lvjiachuan.com/static/img/index/banner03.jpg' },
  //       { img: 'http://shouquan.lvjiachuan.com/static/img/index/banner1.jpg' }
  //     ],
  //     menus: [
  //       { name: '扫码发货', icon: '' },
  //       { name: '我要下单', icon: '' },
  //       { name: '代理查询', icon: '' },
  //       { name: '在线客服', icon: '' }
  //     ]
  //   }
  // }
}

</script>
