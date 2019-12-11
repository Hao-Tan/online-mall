import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Cart from '../views/Cart'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/Cart',
        name: 'cart',
        component: Cart
    }
]

const router = new VueRouter({
  routes
})

export default router
