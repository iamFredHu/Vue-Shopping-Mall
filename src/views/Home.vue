<template>
  <div class="home">
    <van-search shape="round" background="#efefef" v-model="searchValue" :placeholder="placeholderVal" disabled
                @click="clickSearch"
    />
    <!-- disabled 禁止聚焦 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#215CC1">
      <van-swipe-item v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.image_url" width="100%" alt="">
      </van-swipe-item>
    </van-swipe>

    <!--  需要控制是否隐藏  -->

    <transition name="van-slide-down">
      <router-view></router-view>
    </transition>


  </div>
</template>

<script>
import {getHomeLists} from "@/request/api";

export default {
  name: 'Home',
  data() {
    return {
      searchValue: "",
      placeholderVal: '',
      bannerList: [],
    }
  },
  methods: {
    clickSearch() {
      this.$router.push('/home/searchpopup')

    }
  },
  created() {
    getHomeLists().then(res => {
      if (res.errno === 0) {
        this.bannerList = res.data.banner
      }
    })
  },
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}


</style>