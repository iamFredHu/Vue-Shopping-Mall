<template>
<div>
  <van-list
      :finished="finished"
      finished-text="没有更多了"
  >
    <van-cell v-if="showSearchTips" v-for="(item,index) in tipsList" :key="index" :title="item" />
  </van-list>
</div>
</template>

<script>
export default {
  name: "SearchTips",
  props:["tipsList","searchValue"],
  data() {
    return {
      list: [],
      finished: false,
      showSearchTips:true
    };
  },
  watch:{
    searchValue(val){
      if(val){
        this.showSearchTips = true
      }else{
        this.showSearchTips = false
      }
    }
  }
};
</script>

<style scoped>

</style>