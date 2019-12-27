<template>
    <div class="cart">
        <div class="bread-wrapper">
            <nav-bread currentPage="Cart" class="content-wrapper"></nav-bread>
        </div>

        <article class="cart-content">
            <el-container class="content-wrapper" direction="vertical">
                <h2 class="g-page-title">
                    MY CART
                </h2>
                <table class="cart-list">
                    <thead class="cart-list-head">
                        <td>ITEMS</td>
                        <td>PRICE</td>
                        <td>QUANTITY</td>
                        <td>SUBTOTAL</td>
                        <td>EDIT</td>
                    </thead>

                    <tr 
                        v-for="item in cartList"
                        class="cart-list-item"
                        :key="item.productId">
                        <td class="item-tab-1">
                            <div class="item-wrapper">
                                <i class="el-icon-success icon-success" :class="{checked: item.checked === '1' }" @click="editCart(item, 'select')"></i>        
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
                                <cart-counter :amount.sync="item.productNum" @update:amount="editCart(item)"></cart-counter>
                            </div>
                        </td>
                        <td class="item-tab-4">
                            <div class="item-wrapper">
                                {{item.salePrice * item.productNum | currency("¥")}}
                            </div>
                        </td>
                        <td class="item-tab-5">
                            <div class="item-wrapper">
                                <i class="el-icon-delete" @click="showMd(item.productId)"></i>
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="cart-check">
                    <div class="checkall" @click="checkAll">
                        <i class="el-icon-success icon-success" :class="{checked: cartList.length === selection }"></i>
                        <span class="checkall-text">Select All</span>
                    </div>

                    <div class="checkout">
                        <span class="checkout-total">Items total: <span class="total-num">{{totalPrice | currency("¥")}}</span> </span>
                        <a href="javascript:;" class="g-next-btn" :class="{disable: selection === 0}" @click="checkout">CHECKOUT</a>
                    </div>
                </div>
            </el-container>
        </article>

        <el-dialog
            :visible.sync="removeMdShow"
            width="30%"
            top="0"
            center
            class="g-cart">
            <el-row 
                type="flex"
                justify="center"
                align="middle">
                <span>确认移除该商品？</span>
            </el-row>
            <span slot="footer">
                <el-button @click.native="removeItem" class="left-btn g-cart-btn">确定</el-button>
                <el-button type="primary" @click.native="removeMdShow = false" class="right-btn g-cart-btn">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import NavBread from 'components/NavBread';
    import CartCounter from './counter';
    export default {
        name: "Cart",
        components: {
            NavBread,
            CartCounter
        },
        data() {
            return {
                cartList: [],
                removeMdShow: false,
                deleteProductId: ""
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.cartList.forEach(item => {
                    if (item.checked === "1") {
                        total += item.productNum * item.salePrice;
                    }
                })
                return total;
            },
            selection() {
                let n = 0;
                this.cartList.forEach(item => {
                    if (item.checked === "1") {
                        n += 1;
                    }
                })
                return n;
            }
        },
        created() {
            this.getCartList();
        },
        methods: {
            showMd(productId) {
                this.deleteProductId = productId;
                this.removeMdShow = true;
            },
            getCartList() {
                axios.get("/users/cartList").then(({data}) => { 
                    if (data.status === "0") {
                        this.cartList = data.result;
                    }
                }) 
            },
            removeItem() {
                axios.post("/users/cartDel", {productId: this.deleteProductId}).then(({data}) => {
                    if (data.status === "0") {
                        this.getCartList();
                        this.removeMdShow = false;
                    }
                })
            },
            editCart(item, flag) {
                if (flag === "select") {
                    item.checked = item.checked == "1"? "0":"1";
                }
                
                axios.post("/users/cartEdit", item).then(({data}) => {
                    if (data.status === "0" && flag !== "select") {
                        axios.get("/users/getCartCount").then(({data}) => {
                            this.$store.commit("initCartCount", data.result.cartCount);
                        })
                    }
                })
            },
            checkAll() {
                let checked;
                if (this.selection === this.cartList.length) {
                    checked = "0";
                } else {
                    checked = "1";
                }
                axios.post("/users/checkedAll",{checked}).then(({data}) => {
                    if (data.status === "0") {
                        this.cartList.forEach(item => {
                            item.checked = checked;
                        })
                    }
                })
            },
            checkout() {
                if (this.selection) {
                    this.$router.push("address");
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .cart {
        i {
            font-size: 20px;
            cursor: pointer;

            &.checked {
                color: #ee7a23;
                border: none;
                font-size: 22px;
            }
        }

        .icon-success {
            color: #fff;
            border: 1px solid #999;
            border-radius: 50%;
            margin: 0 20px;
        }

        &-list-head {
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

        &-list-item {
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
                width: 40%;

                .pic {
                    width: 80px;
                    display: inline-block;
                    border: 1px solid #e9e9e9;
                    padding-bottom: 78px;
                    position: relative;

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

            .item-tab-2 {
                width: 10%;
            }

            .item-tab-3 {
                width: 20%;
            }

            .item-tab-4 {
                width: 20%;
                color: #d1434a;
            }

            .item-tab-5 {
                width: 10%;
            }
        }

        &-check {
            margin: 20px 0 40px;
            border: 1px solid #e9e9e9;
            @include flex-between();
            height: 55px;
            background-color: #fff;

            .checkall {
                @include flex-center();
                cursor: pointer;
            }

            .checkall-text:hover{
                color: #d1434a;
            }

            .checkout-total {
                margin-right: 30px;
            }

            .total-num {
                color: #d1434a;
                font-weight: 700;
                font-size: 18px;
                padding-left: 20px; 
            }
            .checkout {
                height: 100%;
            }

            .disable {
                background-color: #f16f75;
                cursor: default;
            }
        }
    }
</style>