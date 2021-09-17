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
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home'),
        children: [
            {
                path: 'searchpopup',
                name: 'SearchPopup',
                component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/SearchPopup'),
            }
        ],
        meta: {
            active: 0,
            showTabBar:1
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail'),
        meta: {
            showTabBar:0
        }
    },
    {
        path: '/topic',
        name: 'Topic',
        component: () => import(/* webpackChunkName: "Topic" */ '../views/Topic'),
        meta: {
            active: 1,
            showTabBar:1
        }
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "Category" */ '../views/Category'),
        meta: {
            active: 2,
            showTabBar:1
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart'),
        meta: {
            active: 3,
            showTabBar:1
        }
    },
    {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/User'),
        meta: {
            active: 4,
            showTabBar:1
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
