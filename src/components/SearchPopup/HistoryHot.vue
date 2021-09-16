<template>
  <div>
    <div class="his-hot" v-if="displayHistory">
      <div class="hd">
        <span class="title">历史记录</span>
        <van-icon name="delete-o" @click="deleteClick"/>
      </div>
      <div class="bd">
        <van-tag plain type="default" v-for="(history,index) in historyList" :key="index" @click="tagClick(history)">
          {{ history }}
        </van-tag>

      </div>
    </div>
    <div class="his-hot">
      <div class="hd">
        <span class="title">热门搜索</span>
      </div>
      <div class="bd">
        <van-tag plain type="default" v-for="(hot,index) in hotList" :key="index" :class="{'red':hot.is_hot}"
                 @click="tagClick(hot.keyword)">
          {{ hot.keyword }}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import {clearHistory} from "@/request/api";
import {Toast} from "vant";

export default {
  name: "HistoryHot",
  data() {
    return {
      displayHistory: true
    }
  },
  props: ["historyList", "hotList"],
  methods: {
    tagClick(val) {
      console.log(val)
      this.$emit("tagClick", val)
    },
    deleteClick() {
      clearHistory().then(res => {
        if (res.errno === 0) {
          // 过渡时间
          setTimeout(()=>{},1000)
          // 成功删除的提示
          Toast.success('历史记录已被清除')
          // 隐藏历史记录的盒子
          this.displayHistory = false
        }
      })
    }
  }
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