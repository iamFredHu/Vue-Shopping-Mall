<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/topic" icon="label-o">专题</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "AppTabBar",
  computed: {
    active: {
      get() {
        return this.$route.meta.active
      },
      set() {
      }
    }
  }
}
</script>

<style scoped>

</style>