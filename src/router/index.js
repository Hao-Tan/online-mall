import Vue from 'vue'
import VueRouter from 'vue-router'
const [
    Home,
    Cart,
    Address,
    OrderConfirm,
    OrderSuccess
] = [
    () => import("views/Home"),
    () => import("views/Cart"),
    () => import("views/Address"),
    () => import("views/OrderConfirm"),
    () => import("views/OrderSuccess")
]

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
    },
    {
        path: '/Address',
        name: 'address',
        component: Address
    },
    {
        path: '/OrderConfirm',
        name: 'orderConfirm',
        component: OrderConfirm
    },
    {
        path: '/OrderSuccess',
        name: 'orderSuccess',
        component: OrderSuccess
    },
    {
        path: "*",
        redirect: "/"
    }
]

const router = new VueRouter({
  routes
})

export default router
