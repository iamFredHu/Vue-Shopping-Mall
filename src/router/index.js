import Vue from 'vue'
import VueRouter from 'vue-router'
import {Toast} from "vant";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home'),
        children: [
            {
                path: 'searchpopup',
                name: 'SearchPopup',
                component: () => import('../views/SearchPopup'),
            }
        ],
        meta: {
            active: 0
        }
    },
    {
        path: '/topic',
        name: 'Topic',
        component: () => import('../views/Topic'),
        meta: {
            active: 1
        }
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import('../views/Category'),
        meta: {
            active: 2
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart'),
        meta: {
            active: 3
        }
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/User'),
        meta: {
            active: 4
        }
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: "/",
    routes
})

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (to.path === '/cart') {
        if (token) {
            next()
        } else {
            Toast.fail("请先登录！")
            next("/user")

        }
    }
    next()
})

export default router
