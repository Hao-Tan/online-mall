<template>
    <div class="order-success">
        <div class="bread-wrapper">
            <nav-bread currentPage="Order Success" class="content-wrapper"></nav-bread>
        </div>
        <article class="order-success-main">
            <el-container class="content-wrapper" direction="vertical">
                <h2 class="g-page-title">
                    CHECK OUT
                </h2>
                <pay-step :stepIndex="4" class="g-page-step"></pay-step>
                <div class="order-res">
                    <img :src="require('assets/img/ok-2.png')">
                    <h3>Congratulations! <br>Your order is under processing!</h3>
                    <p>
                        <span>Order ID：{{orderId}}</span>
                        <span>Order total：{{orderTotal|currency('$')}}</span>
                    </p>
                    <div class="goto">
                        <router-link class="g-back-btn" :to="{path:'cart'}">CART LIST</router-link>
                        <router-link class="g-next-btn" :to="{path:'/'}">GOODS LIST</router-link>
                    </div>   
                </div>  
            </el-container>
        </article>
    </div>
</template>

<script>
    import axios from 'axios';
    import NavBread from 'components/NavBread';
    import PayStep from 'components/PayStep';
    export default {
        name: "OrderSuccess",
        components: {
            NavBread,
            PayStep
        },
        data() {
            return {
                orderId: '',
                orderTotal: 0
            }
        },
        created() {
            this.orderId = this.$route.query.orderId;
            if (!this.orderId) {
                return;
            }
            axios.get("/users/orderDetail", {
                params: {
                    orderId: this.orderId
                }
            }).then(({data}) => {
                if (data.status === "0") {
                    this.orderTotal = data.result.orderTotal;
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .order-res {
        @include flex-center(column);
        padding: 80px 0 50px;
        text-align: center;

        img {
            width: 100px;
            margin-bottom: 60px;
        }

        h3 {
            font-size: 24px;
            color: #333;
            font-weight: 300;
            margin-bottom: 20px;
        }

        p {
            margin-bottom: 40px;
        }

        p span {
            color: #999;
            margin: 0 10px;
            font-size: 18px;
        }

        .goto a {
            width: 205px;
            height: 40px;
            line-height: 40px;
            margin: 0 10px;
        }
    }
</style>