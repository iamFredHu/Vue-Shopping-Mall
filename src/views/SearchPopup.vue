<template>
  <div class="search-popup">

    <van-search
        shape="round"
        background="#efefef"
        v-model="searchValue"
        show-action
        :placeholder="placeholderVal"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
    />
    <!-- onInput 当输入框内容发生变化时触发 -->

    <!-- 三个界面，三个组件，一个是热词和历史记录，一个是搜索提示，一个是搜索结果 用v-if实现 -->
    <HistoryHot v-if="comShow === 1" :historyList="historyList" :hotList="hotList" @tagClick="tagClick"></HistoryHot>
    <SearchTips v-else-if="comShow === 2" :tipsList="tipsList" :searchValue="searchValue"
                @tipsClick="tipsClick"></SearchTips>
    <SearchResult v-else-if="comShow ===3" :filterCategory="filterCategory" :goodsList="goodsList"
                  @categoryChanged="categoryChanged" @priceChanged="priceChanged"/>


  </div>

</template>

<script>
import HistoryHot from "@/components/SearchPopup/HistoryHot";
import SearchTips from "@/components/SearchPopup/SearchTips";
import SearchResult from "@/components/SearchResult";
import {getProductItem, getSearchData, getSearchTipsData} from "@/request/api";


export default {
  name: "SearchPopup",
  components: {SearchResult, SearchTips, HistoryHot},
  created() {
    getSearchData().then(res => {
      if (res.errno === 0) {
        console.log(res.data)
        this.placeholderVal = res.data.defaultKeyword.keyword
        this.historyList = res.data.historyKeywordList
        this.hotList = res.data.hotKeywordList
      }

    })
  },
  data() {
    return {
      searchValue: '', // 用户输入的文本
      placeholderVal: '', // 提示词文本
      comShow: 1, // 控制热词历史记录、搜索提示、搜索结果之间的切换（分别用1、2、3来表示）
      historyList: [], // 历史记录的列表数据
      hotList: [], // 热门搜索的列表数据
      tipsList: [], // 搜索提示列表数据
      filterCategory: [], // 搜索产品内容的分类数据
      goodsList: [], // 搜索产品的列表数据

      // 价格排序
      order: "desc",
      // 分类id
      categoryId: 0,
      // 默认的搜索方式 id 或者 price
      sort: "id"
    }
  },
  methods: {
    tipsClick(val) {
      this.onSearch(val)
      this.searchValue = val
    },
    tagClick(val) {
      this.onSearch(val)
      this.searchValue = val
    },
    categoryChanged(newVal) {
      this.categoryId = newVal
      this.onSearch(this.searchValue)
    },
    priceChanged(newVal) {
      console.log("父级价格排序被触发")
      this.order = newVal
      this.sort = "price"
      this.onSearch(this.searchValue)
    },
    // 用户回车进行搜索时执行 val是用户输入的值
    onSearch(val) {
      // 这里进行请求发送
      this.comShow = 3
      getProductItem({
        keyword: val,
        // page: xxx,
        // size: xxx,
        order: this.order,
        categoryId: this.categoryId,
        sort: this.sort
      }).then(res => {
        if (res.errno === 0) {
          console.log(res.data)
          let {filterCategory, goodsList} = res.data
          this.goodsList = goodsList
          let newCategory = JSON.parse(JSON.stringify(filterCategory).replace(/name/g, 'text').replace(/id/g, 'value'))
          console.log("分类测试")
          console.log(newCategory)
          this.filterCategory = newCategory
        }
      })

    },
    onCancel() {
      // 这里要把页面进行返回 下面的方法不能使用，因为需要返回上一级，不一定是返回 home
      // this.$router.push('/home')
      this.$router.go(-1) // 返回上一级
    },
    onInput(val) {
      this.comShow = 2
      // 发送请求，获取实时搜索的文本提示数据列表
      if (val) {
        getSearchTipsData({keyword: val}).then(res => {
          if (res.errno === 0) {
            console.log(res)
            this.tipsList = res.data
          }
        })
      }
    }
  },
}
</script>

<style scoped>
.search-popup {
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #efefef;
}
</style>