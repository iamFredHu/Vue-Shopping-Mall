<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon :icon="isCollected? 'star':'star-o'"
                             :text="isCollected? '已收藏':'未收藏'"
                             :color="isCollected? 'darkred':'#333'"
                             @click="isCollected=!isCollected"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartNumber" color="#333"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="handleCart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="handleBuy"/>
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "GoodsAction",
  props:["cartNumber"],
  data() {
    return {
      isCollected: false
    }
  },
  methods:{
    handleCart(){
      this.$emit('handleCart')
    },
    handleBuy(){
      this.$toast.fail("暂时不能购买")
    }
  }
}
</script>

<style lang="less" >
.van-goods-action{
  z-index:999999;
}
</style>