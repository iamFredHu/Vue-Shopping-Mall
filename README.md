# vue-shopping-mall

## 记录开发过程中遇到的问题

### 01.NavigationDuplicated: Avoided redundant navigation to current location

避免到当前位置的冗余导航。 简单来说就是重复触发了同一个路由 这个错误是 vur-router更新以后新出现的错误。（我使用的是 vue-router 3.2.0）出现的 但是 （vue-router 3.0.6) 没有出现。
但是也不排除是我的 3.0.6之前做过配置。 解决这个错误也非常简单。只需要在router /index的页面里面 加入

```javascript
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
```

参考：https://blog.csdn.net/luer_LJS/article/details/108362563

### 搜索框，当keyword为空的时候不清空的问题

简单解决了一下，使用watch监听输入框中的内容，如果输入框中为空，则用v-if控制列表不显示 又发现一个问题，在请求数据的时候就应该解决，如果搜索框为空，不应该向服务器请求数据了