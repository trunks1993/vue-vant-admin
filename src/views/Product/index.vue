<template>
  <div class="product-container">
    <van-sku v-model="showBase" :sku="sku" :goods="goods_info" :goods-id="goodsId" :hide-stock="true" :close-on-click-overlay="true" @buy-clicked="onBuyClicked" />
    <div class="category-box">
      <div class="category-box-item" :class="{active: item.category_id === activeId}" v-for="(item, index) in items" :key="index">
        {{item.category_name}}
      </div>
    </div>
    <div class="product-box">
      <van-card v-for="(p, index) in productList" :key="index" :num="p.stock" :price="p.price" :desc="p.desc" :title="p.product_name" :thumb="p.imgurl">
        <div slot="footer">
          <van-button type="danger" size="mini" @click="showSku">购买</van-button>
        </div>
      </van-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [{ category_id: 1, category_name: '膏药' }],
      activeId: 1,
      productList: [
        { product_id: 1, product_name: '万祈康膏药', stock: 12, price: 12, desc: '测试测试描述', imgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/nUYFrDawI8bZp95lLhALcJe6fiaYFrfdEy1LmmqPocaWl8aL9h9QmDHQJ14QlVgazaViaic7yShMh53zkmbia4K54w/132' }
      ],
      // sku
      showBase: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [{
          k: '颜色', // skuKeyName：规格类目名称
          v: [{
            id: '30349', // skuValueId：规格值 id
            name: '红色'
          }, {
            id: '1215',
            name: '蓝色'
          }],
          k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        }],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [{
          id: 2259, // skuId，下单时后端需要
          price: 100, // 价格（单位分）
          s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
          s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
          s3: '0', // 最多包含3个规格值，为0表示不存在该规格
          stock_num: 110 // 当前 sku 组合对应的库存
        }],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods_info: {
        title: '测试商品',
        picture: 'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg',
        price: 1,
        origin: ''
      },
      goodsId: '946755'
    }
  },
  methods: {
    showSku() {
      this.showBase = true
    },
    onBuyClicked() {

    }
  }
}
</script>
<style lang="less">
.product-container {
  display: flex;

  .van-sku-container {
    text-align: left;

    .van-sku-actions {
      button:nth-child(1) {
        display: none;
      }
    }
  }

  .category-box {
    height: 100vh;
    background: rgba(0, 0, 0, 0.01);

    .active {
      background: #fff;
    }

    &-item {
      font-size: 14px;
      line-height: 30px;
      height: 30px;
      width: 80px;
    }
  }

  .product-box {
    padding: 15px;
    width: 100%;
    height: 100vh;
    overflow: scroll;
    box-sizing: border-box;
  }
}
</style>