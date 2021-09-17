<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled/>
      <van-dropdown-item title="价格" v-model="priceVal" :options="filterPrice" @change="priceChanged"/>
      <van-dropdown-item title="分类" v-model="categoryVal" :options="filterCategory" @change="categoryChanged"/>
    </van-dropdown-menu>

    <ProductItem v-if="goodsList.length" :goodsList="goodsList" :ifGo="false"></ProductItem>
    <van-empty v-else image="search" description="没有找到结果哦" />

  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";

export default {
  name: "SearchResult",
  components: {ProductItem},
  props: ["filterCategory", "goodsList"],
  methods: {
    categoryChanged(newVal) {
      // newVal 就是分类ID
      this.$emit("categoryChanged", newVal)
    },
    priceChanged(newVal) {
      console.log(newVal)
      this.$emit("priceChanged", newVal)
    }
  },
  data() {
    return {
      priceVal: "desc",
      categoryVal: 0,
      filterPrice: [
        {text: '价格由高到低', value: 'desc'},
        {text: '价格由低到高', value: 'asc'},
      ],
    };
  },
  beforeUpdate() {
    // 遍历 filterCategory 数组，看看哪一项的 checked 为 true
    this.filterCategory.map(item => {
      if (item.checked) {
        this.categoryVal = item.value

      }
    })
  }
}
</script>

<style scoped>

</style>