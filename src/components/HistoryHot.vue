<template>
  <div>
    <div class="his-hot">
      <div class="hd">
        <span class="title">历史记录</span>
        <van-icon name="delete-o"/>
      </div>
      <div class="bd">
        <van-tag plain type="default" v-for="(history,index) in historyList" :key="index">{{ history }}</van-tag>

      </div>
    </div>
    <div class="his-hot">
      <div class="hd">
        <span class="title">热门搜索</span>
      </div>
      <div class="bd">
        <van-tag plain type="default" v-for="(hot,index) in hotList" :key="index" :class="{'red':hot.is_hot}">
          {{ hot.keyword }}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryHot",
  props: ["historyList", "hotList"]
}
</script>

<style lang="less" scoped>
.his-hot {
  background-color: #fff;
  padding: 10px;
  /* 左右两侧的空格 */
  margin-bottom: 20px;

  .hd {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    margin-bottom: 5px;
  }

  .van-tag {
    margin-right: 5px;
    padding: 3px;
    margin-bottom: 3px;
  }

  .red {
    color: darkred;
  }

  .title {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}

</style>