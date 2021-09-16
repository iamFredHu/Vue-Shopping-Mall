import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
        component: Home,
        children: [
            {
                path: 'searchpopup',
                name: 'SearchPopup',
                component: () => import('../components/SearchPopup'),
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: "/",
    routes
})

export default router
