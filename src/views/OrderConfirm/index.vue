<template>
    <div class="order-confirm">
        <div class="bread-wrapper">
            <nav-bread currentPage="Order Confirm" class="content-wrapper"></nav-bread>
        </div>

        <article class="order">
            <el-container class="content-wrapper" direction="vertical">
                <h2 class="g-page-title">
                    CHECK OUT
                </h2>
                <pay-step :stepIndex="2" class="g-page-step"></pay-step>
                <h2 class="g-sub-title">
                    ORDER CONTENT
                </h2>
                <table class="order-list">
                    <thead class="order-list-head">
                        <td>ORDER ITEM</td>
                        <td>PRICE</td>
                        <td>QUANTITY</td>
                        <td>SUBTOTAL</td>
                    </thead>
                    <tr class="order-list-item"
                    v-for="item in orderList"
                    :key="item.productId">
                        <td class="item-tab-1">
                            <div class="item-wrapper">       
                                <div class="pic">
                                    <img v-lazy="require('assets/img/'+item.productImage)" class="item-image">
                                </div>
                                <span class="item-name">{{item.productName}}</span>
                            </div>    
                        </td>
                        <td class="item-tab-2">
                            <div class="item-wrapper">
                                {{item.salePrice | currency("¥")}}
                            </div>
                        </td>
                        <td class="item-tab-3">
                            <div class="item-wrapper">
                                ×{{item.productNum}}
                            </div>
                        </td>
                        <td class="item-tab-4">
                            <div class="item-wrapper">
                                {{item.salePrice * item.productNum | currency("¥")}}
                            </div>
                        </td>
                    </tr>
                </table> 

                <div class="order-bill">
                        <ul class="order-bill-list">
                            <li class="order-bill-item">
                                <span>Items  subtotal:</span>
                                <span>{{subTotal | currency('¥')}}</span>
                            </li>
                            <li class="order-bill-item">
                                <span>Shipping:</span>
                                <span>{{shipping | currency('¥')}}</span>
                            </li>
                            <li class="order-bill-item">
                                <span>Discount:</span>
                                <span>{{discount | currency('¥')}}</span>
                            </li>
                            <li class="order-bill-item">
                                <span>Order total:</span>
                                <span class="order-total-price">{{orderTotal | currency('¥')}}</span>
                            </li>
                        </ul>
                </div>

                <div class="goto">
                    <router-link class="g-back-btn" :to="{path:'address'}">PREVIOUS</router-link>
                    <a href="javascript:;" class="g-next-btn" @click="payment">PROCEED TO PAYMENT</a>
                </div>   
            </el-container>
        </article>
    </div>
</template>

<script>
    import {cartListMixin} from 'assets/js/mixins';
    import axios from 'axios';
    import NavBread from 'components/NavBread';
    import PayStep from 'components/PayStep';
    export default {
        name: "OrderConfirm",
        components: {
            NavBread,
            PayStep
        },
        mixins: [cartListMixin],
        data() {
            return {
                cartList: [],
                shipping: 0,
                discount: 200
            }
        },
        computed: {
            orderList() {
                return this.cartList.filter(item => {
                    return item.checked === "1";
                })
            },
            subTotal() {
                let total = 0;
                this.orderList.forEach(item => {
                    total += item.productNum * item.salePrice;
                })
                return total;
            },
            orderTotal() {
                return this.subTotal - this.discount + this.shipping;
            },
            itemTotal() {
                let total = 0;
                this.orderList.forEach(item => {
                    total += item.productNum;
                })
                return total;
            }
        },
        created() {
            this.getCartList();
        },
        methods: {
            payment() {
                let addressId = this.$route.query.addressId;
                axios.post("/users/payment", {
                    addressId,
                    orderTotal: this.orderTotal
                }).then(({data}) => {
                    if (data.status === "0") {
                        this.$store.commit("updateCartCount", -this.itemTotal);
                        this.$router.replace({
                            path:'/orderSuccess?orderId=' + data.result.orderId
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .order-list-head {
        background-color:#605f5f;
        color: #fff;
        letter-spacing: 0.25em;

        & td {
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
        }
    }

    .order-list-item {
        background-color: #fff;
        border:1px solid #e9e9e9;
        border-top: none;

        td {
            height: 145px;
            vertical-align: middle;
        }

        .item-wrapper {
            @include flex-center();
        }


        .item-tab-1 {
            width: 52%;
            color: #333;

            .pic {
                width: 80px;
                display: inline-block;
                border: 1px solid #e9e9e9;
                padding-bottom: 78px;
                position: relative;
                margin-left: 20px;

                .item-image{
                    position: absolute;
                    width: 100%;
                }
            }

            .item-name {
                font-weight: 700;
                font-size: 14px;
                padding: 0 20px;
                @include ellipsis();
                flex: 1;
            }
        }

        .item-tab-2,
        .item-tab-3,
        .item-tab-4 {
            width: 16%;
        }

        .item-tab-4 {
            color: #d1434a;
        }
    }

    .order-bill {
        margin: 40px 0 20px;

        &-list {
            display: table;
            width: 100%;
        }

        &-item {
            display: table-row;
            height: 40px;
            font-size: 18px;
            font-weight: 400;

            span {
                display: table-cell;
                text-align: right;
                padding: 0 10px;

                &:first-child {
                    color: #999;    
                }

                &:last-child {
                    width: 50px;
                    color: #605f5f;
                }

                &.order-total-price {
                    color: #d1434a;
                    font-size: 20px;
                }
            }
        }
    }

    .goto {
        @include flex-between();
        margin-bottom: 80px;

        a {
            height: 40px;
            line-height: 40px;
        }
    }

</style>