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
    <van-grid :column-num="channelData.length">
      <van-grid-item v-for="item in channelData" :key="item.id" :icon="item.icon_url" :text="item.name"></van-grid-item>
    </van-grid>
    <div class="brand">
      <h3>品牌制造商直供</h3>
      <van-grid :column-num="2">
        <van-grid-item v-for="item in brandList" :key="item.id">
          <p class="brandTitle">{{ item.name }}</p>
          <p class="brandPrice">{{ item.floor_price | rmbFormat }}</p>
          <van-image class="brandImg" :src="item.pic_url"/>
        </van-grid-item>
      </van-grid>
    </div>


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
      channelData: [],
      brandList: []
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
        this.brandList = res.data.brandList
        this.channelData = res.data.channel
        console.log(this.channelData)
        console.log(res.data)
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

.brand {
  @grid-item-content-padding: 0;
  background-color: white;
  text-align: center;
  padding: 15px;

  h3 {
    font-size: 20px;
  }

  van-grid-item {
    color: white;

  }

  .brandTitle {
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: black;
    z-index: 1;
  }

  .brandPrice {
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
    position: absolute;
    left: 20%;
    top: 20%;
    transform: translate(-30%, -30%);
    color: darkred;
    z-index: 1;
  }

}

</style>