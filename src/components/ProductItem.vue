<template>
  <ul>
    <li v-for="item in goodsList" :key="item.id">
      <img :src="item.list_pic_url" style="display: block;" width="100%" alt=""/>
      <div class="van-ellipsis">{{item.name}}</div>
      <div class="price">{{ item.retail_price | RMBformat }}</div>
      <div></div>
    </li>

  </ul>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["goodsList"]
}
</script>

<style lang="less" scoped>
ul {
  padding: 10px 2%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  li {
    width: 49%;
    margin-bottom: 10px;
    background: #fff;
    text-align: center;
    line-height: 30px;

    .price {
      color: darkred;
    }
  }
}
</style>