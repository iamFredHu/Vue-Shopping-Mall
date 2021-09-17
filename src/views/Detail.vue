<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#215CC1">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" alt="" style="display: block;">
      </van-swipe-item>
    </van-swipe>
    <Tips></Tips>
    <div class="productInfo">
      <div class="productTitle">{{ productInfo.name }}</div>
      <div class="goodsBrief">{{ productInfo.goods_brief }}</div>
      <div class="retailPrice">{{ productInfo.retail_price | rmbFormat }}</div>
    </div>
    <van-cell title="选择购买数量、型号、颜色" is-link @click="isSkuShow=true"/>
    <div class="attribute">
      <h3>商品参数</h3>
      <ul>
        <li v-for="(item,index) in attribute" :key="index">
          <div class="leftTitle">{{ item.name }}</div>
          <div class="rightContent van-ellipsis">{{ item.value }}</div>
        </li>
      </ul>
    </div>
    <!-- 以下是商品图片 -->
    <div v-html="productImg" class="productImg"></div>

    <div class="title0">
      <span>常见问题</span>
    </div>
    <ul class="issue">
      <li v-for="item in issue" :key="item.id">
        <h3>{{ item.question }}</h3>
        <p>{{ item.answer }}</p>
      </li>
    </ul>
    <div class="title0">
      <span>大家都在看</span>
    </div>
    <ProductItem :goodsList="goodsList" :ifGo="true"/>
    <van-sku
        ref="sku"
        v-model="isSkuShow"
        :sku="sku"
        :goods="goods"
        :hide-stock="sku.hide_stock"
    />
    <div>
      <GoodsAction @handleCart="handleCart" :cartNumber="cartNumber"></GoodsAction>
    </div>
  </div>

</template>

<script>
import {addToCart, getCartNumbers, getGoodsRelatedData, getProductDetail} from "@/request/api";
import Tips from "@/components/Tips";
import ProductItem from "@/components/ProductItem";
import GoodsAction from "@/components/GoodsAction";

export default {
  name: "Detail",
  components: {GoodsAction, ProductItem, Tips},
  methods: {
    handleCart() {
      // 点击购物车按钮后 如果sku没有展示，首先要展示sku 如果sku已经在展示状态，应该跳转到购物车页面
      if (this.isSkuShow) {
        // 加入到购物车中，跳转页面

        // 1. 获取要添加的商品数量
        // console.log(this.$refs.sku.getSkuData().selectedNum)

        addToCart({
          goodsId: this.$route.query.id,
          productId: this.productList[0].id,
          number: this.$refs.sku.getSkuData().selectedNum
        }).then(res => {
          if (res.errno === 0) {
            console.log(res)
            // 更新购物车数量
            this.cartNumber = res.data.cartTotal.goodsCount
            // 跳转到购物车页面
            setTimeout(() => {
              this.$toast.success("已成功加入购物车！")
              this.$router.push("/cart")
            }, 500)
          }
        })

      } else {
        this.isSkuShow = true
      }
    }
  },
  data() {
    return {
      issue: [],
      // sku相关数据：
      isSkuShow: false,
      sku: {
        tree: [],
        hide_stock: false,
        price: '0',
        stock_num: 0,
      },
      goods: {
        picture: ""
      },

      gallery: [], // 轮播图
      productInfo: {}, // 产品信息
      attribute: {}, // 商品描述
      productImg: "",
      goodsList: [],
      cartNumber: 0, // 购物车产品数量
      productList: []
    }
  },
  created() {
    // 发送请求 请求产品数据详情等
    getProductDetail({id: this.$route.query.id}).then(
        res => {
          console.log(res.data)
          this.gallery = res.data.gallery
          this.productInfo = res.data.info
          this.attribute = res.data.attribute
          this.productImg = res.data.info.goods_desc
          this.issue = res.data.issue
          this.sku.price = res.data.info.retail_price | this.rmbFormat
          this.sku.stock_num = res.data.info.goods_number
          this.goods.picture = res.data.info.list_pic_url
          this.productList = res.data.productList
        }
    )
    // 发送请求获取相关产品数据(大家都在看模块)
    getGoodsRelatedData({
      id: this.$route.query.id
    }).then(res => {
      console.log(res.data);
      this.goodsList = res.data.goodsList
    })

    // 获取购物车数量
    getCartNumbers().then(res => {
      this.cartNumber = res.data.cartTotal.goodsCount
      console.log("购物车" + this.cartNumber)
    })
  }
}
</script>

<style lang="less" scoped>
.productInfo {
  background-color: #fff;
  text-align: center;
  line-height: 40px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  .productTitle {
    font-size: 20px;
  }

  .goodsBrief {
    color: gray;
  }

  .retailPrice {
    color: darkred;
  }
}

.attribute {
  background-color: #fff;
  margin-top: 20px;
  padding: 10px 16.8px;

  h3 {
    font-size: 16.38px;
    line-height: 50px;
  }

  li {
    line-height: 40px;
    height: 40px;
    background-color: #efefef;
    display: flex;
    margin-bottom: 10px;
    border-radius: 2px;

    .leftTitle {
      flex: 3;
      text-align: right;
      margin-right: 10px;
      color: gray;
      font-size: 12px;
    }

    .rightContent {
      flex: 7;
      font-size: 16.8px;
    }
  }
}

// 无视 UI 组件的样式 深度样式写法
/deep/ .productImg {
  img {
    display: block;
    width: 100%;
  }
}

.title0 {
  width: 100%;
  background: #fff;
  height: 50px;
  position: relative;

  &::before {
    content: "";
    width: 50%;
    height: 2px;
    background: #ccc;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    margin-left: -25%;
  }

  span {
    width: 30%;
    position: relative;
    background: #fff;
    display: block;
    text-align: center;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }
}

.issue {
  padding: 0 4%;
  background: #fff;

  li {
    h3 {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      position: relative;
      font-weight: normal;

      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }

    p {
      font-size: 12px;
      line-height: 20px;
      padding-left: 20px;
    }
  }
}
</style>