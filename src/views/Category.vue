<template>
  <div id="category">
    <van-search shape="round" background="#efefef" disabled @click="clickSearch"/>
    <van-row class="pageContent">
      <van-col>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="标签名称"/>
          <van-sidebar-item title="标签名称"/>
          <van-sidebar-item title="标签名称"/>
        </van-sidebar>
      </van-col>
      <van-col>
        <category-page></category-page>
      </van-col>

    </van-row>


  </div>
</template>

<script>
import CategoryPage from "@/components/CategoryPage";

export default {
  name: "Category",
  components: {CategoryPage},
  data() {
    return {
      activeKey: 0
    }
  },
  methods: {
    clickSearch() {
      this.$router.push('/home/searchpopup')
    }
  }
}
</script>

<style lang="less" scoped>
.pageContent{
  height: 100%;
  .van-sidebar{
    height: 100%;
  }
}
</style>