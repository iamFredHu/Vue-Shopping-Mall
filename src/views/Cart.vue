<template>
  <div>
    <Tips/>
    <van-checkbox-group v-model="result">
      <van-checkbox v-for="item in cartList" :key="item.id" :name="item.id" @click="changeCh(item)">
        <van-card
            :num="item.number"
            :price="item.retail_price"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar :price="cartTotal.checkedGoodsAmount" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        累计共{{ cartTotal.checkedGoodsCount }}件商品，可点击
        <van-button type="primary" size="small" hairline>编辑</van-button>
        进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from "@/components/Tips";
import {changeChecked, getCartInfo} from "@/request/api";

export default {
  name: "Cart",
  components: {Tips},
  data() {
    return {
      // 展示选中元素的数组
      result: [],
      // 购物车列表数据
      cartList: [],
      // 商品相关信息
      cartTotal: {},
    };
  },
  computed: {
    checked() {
      return this.result.length === this.cartList.length ? true : false
    }
  },
  methods: {
    updateTotal(res){
      this.cartList = res.data.cartList
      this.cartTotal = res.data.cartTotal
      this.cartTotal.checkedGoodsAmount *= 100
      // 首先要清空
      this.result = []
      this.cartList.map(item => {
        if (item.checked === 1) {
          this.result.push(item.id)
        }
      })
    },
    onSubmit() {
      this.$toast.fail("该功能暂不支持哦")
    },
    changeCh(item) {
      changeChecked({
        isChecked: item.checked === 0 ? 1 : 0,
        productIds:item.product_id
      }).then(res => {
        if (res.errno === 0) {
          this.updateTotal(res)
        }
      })
    }
  },
  created() {
    getCartInfo().then(res => {
      if (res.errno === 0) {
        this.updateTotal(res)
      }
    })
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-checkbox__label {
  flex: 1;
}

.van-checkbox-group {
  background-color: #fafafa;
  padding-bottom: 15px;

  .van-checkbox {
    padding: 10px 15px;
    border-bottom: 1px solid #ccc;
  }
}

.van-submit-bar {
  bottom: 50px;
  border-bottom: 1px solid #ccc;
}

.van-stepper {
  text-align: right;
}

.van-button--square {
  height: 100%;
}
</style>