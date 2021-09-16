<template>
  <div>
    <van-row @click="openModal">
      <van-col span="6">
        <img :src="avatarSrc" alt/>
      </van-col>
      <van-col span="15">{{ nickName }}</van-col>
      <van-col span="3">
        <van-icon name="arrow"></van-icon>
      </van-col>
    </van-row>
    <van-grid :column-num="3" square>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
    </van-grid>
    <transition name="van-fade">
      <div class="login-modal" v-show="showLoginModal">
        <div class="close-modal" @click="showLoginModal=!showLoginModal"></div>
        <van-form @submit="onSubmit" class="login-form">
          <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </transition>
  </div>
</template>

<script>
import {loginPost} from "@/request/api";

export default {
  name: "User",
  data() {
    return {
      avatarSrc: "",
      username: '',
      password: '',
      showLoginModal: false,
      nickName: "请登录你的账号"
    }
  },
  created() {
    // 组件刚创建时也需要判断用户是否登录，获取localStorage
    let token = localStorage.getItem("token")
    if (token) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.nickName = userInfo.nickname
      this.avatarSrc = userInfo.avatar
    }
  },
  methods: {
    openModal() {
      let token = localStorage.getItem("token")
      if (token) {
        return
      } else {
        this.showLoginModal = !this.showLoginModal
      }
    },
    onSubmit(values) {
      console.log('submit', values)
      let username = values['用户名']
      let pwd = values['密码']
      loginPost({
        username,
        pwd
      }).then(res => {
        if (res.errno === 0) {
          console.log(res.data)
          // 1. 登录框提示登陆成功 2.token保存至本地 3.关闭窗口 4.处理userInfo至窗口
          this.$toast.success("登陆成功！")
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo))

          setTimeout(() => {
            this.showLoginModal = !this.showLoginModal
            this.nickName = res.data.userInfo.nickname
            this.avatarSrc = res.data.userInfo.avatar
          }, 500)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login-modal {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;

  .login-form {
    width: 90%;
    background-color: #fff;
    padding-bottom: .2rem;
    position: absolute;
    left: 50%;
    top: 35%;
    margin-left: -45%;
  }

  .close-modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
}

.van-row {
  padding: 20px 4%;
  background: #333;
  color: #fff;

  .van-col {
    line-height: 70px;
    font-size: 18px;

    img {
      width: 70px;
      border-radius: 50%;
      display: block;
    }

    &:last-child {
      text-align: right;
    }
  }
}
</style>