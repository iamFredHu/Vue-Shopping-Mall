// 拦截器

import axios from 'axios'

const instance = axios.create({
    baseURL: "http://kumanxuan1.f3322.net:8001",
    timeout: 5000
})

instance.interceptors.request.use(config => {
    // 在发出请求之前执行这个函数
    // 比如：可以判断用户是否登录，如果没有登陆 则 return
    let token = localStorage.getItem("token")
    if (token) {
        // 携带登录凭证发起请求
        config.headers["X-Nideshop-Token"] = token
    }
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    // 在接收到响应之前（在执行then方法之前）
    return res.data
}, err => {
    return Promise.reject(err)
})

export default instance