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
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/address',
        name: 'address',
        component: Address
    },
    {
        path: '/orderConfirm',
        name: 'orderConfirm',
        component: OrderConfirm
    },
    {
        path: '/orderSuccess',
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
