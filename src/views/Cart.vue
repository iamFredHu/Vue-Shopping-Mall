<template>
  <div>
    <Tips/>
    <van-checkbox-group v-model="result" :disabled="isEditing" v-for="item in cartList" :key="item.id">
      <van-swipe-cell>
        <van-checkbox :name="item.id" @click.self="changeCh(item)">
          <van-card :price="item.retail_price" :title="item.goods_name" :thumb="item.list_pic_url"/>
        </van-checkbox>
        <van-stepper v-model="item.number" min="1" :max="100" @change="editCart(item)"/>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteProduct(item)"/>
        </template>
      </van-swipe-cell>
    </van-checkbox-group>


    <van-submit-bar :price="cartTotal.checkedGoodsAmount" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
      <template #tip>
        共选择{{ cartTotal.checkedGoodsCount }}件商品，现在下单，送至深圳大学城，预计{{ arriveTime }}可送达
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from "@/components/Tips";
import {changeCartChecked, changeCartNumber, deleteCartProduct, getCartInfo} from "@/request/api";

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
      isEditing: false
    };
  },
  computed: {
    arriveTime() {
      const day = new Date();
      day.setTime(day.getTime() + 24 * 60 * 60 * 1000)
      const result = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      return result
    },
    checkedAll: {
      get() {
        return this.result.length === this.cartList.length
      },
      set(val) {
        // val 是修改之后的值
        console.log("------set-------", val)

        let ids_arr = []
        this.cartList.map(item => {
          ids_arr.push(item.product_id)
        })
        changeCartChecked({
          isChecked: val ? 1 : 0,
          productIds: ids_arr.toString()
        }).then(res => {
          if (res.errno === 0) {
            this.updateTotal(res)
          }
        })
      }
    }
  },
  methods: {
    deleteProduct(item) {
      // 首先请求服务器删除，然后更新页面
      deleteCartProduct({
        productIds: item.product_id.toString()
      }).then(res => {
        if (res.errno === 0) {
          console.log(res)
          this.updateTotal(res)
        }
      })
    },
    editCart(item) {
      changeCartNumber({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number,
        productId: item.product_id
      }).then(res => {
        if (res.errno === 0) {
          this.updateTotal(res)

        }
      })
    },
    updateTotal(res) {
      console.log(res)
      this.cartList = res.data.cartList
      this.cartTotal = res.data.cartTotal
      this.cartTotal.checkedGoodsAmount *= 100
      // 首先要清空 防止数组变得越来越长
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
      // 告诉后端我们改变了哪些值，后端收到以后，返回给我们一个处理过后的完整的页面数据
      changeCartChecked({
        isChecked: item.checked === 0 ? 1 : 0,
        productIds: item.product_id
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

.delete-button {
  height: 100%;
}

.van-checkbox-group {
  margin: 0;
  background-color: #fafafa;
  border-bottom: 1px solid #ccc;

  .van-checkbox {
    padding-left: 15px;
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

.van-stepper {
  position: relative;
  top: -35px;
  right: 10px;
}

.goods-card {
  margin: 0;
  background-color: white;
}

</style>