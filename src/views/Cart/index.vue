<template>
    <div class="cart">
        <div class="bread-wrapper">
            <nav-bread currentPage="Cart" class="content-wrapper"></nav-bread>
        </div>

        <article class="cart-content">
            <el-container class="content-wrapper" direction="vertical">
                <h2 class="cart-title">
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

                    <tr class="cart-list-item">
                        <td class="item-tab-1">
                            <div class="item-wrapper">
                                <i class="el-icon-success"></i>        
                                <div class="pic">
                                    <img src="https://www.hover.com/packs/src/application/images/common/hv_logo-aeb786424e4c4ba2a199aafaa1960943.svg" class="item-image">
                                </div>
                                <span class="item-name">123</span>
                            </div>
                            
                        </td>
                        <td class="item-tab-2">
                            <div class="item-wraaper">
                                123
                            </div>
                        </td>
                        <td class="item-tab-3">
                            <div class="item-wrapper">
                                <cart-counter :amount.sync="amount"></cart-counter>
                            </div>
                        </td>
                        <td class="item-tab-4">
                            <div class="item-wrapper">
                                321
                            </div>
                        </td>
                        <td class="item-tab-5">
                            <div class="item-wrapper">
                                <i class="el-icon-delete"></i>
                            </div>
                        </td>
                    </tr>

                </table>
                <div class="cart-check"></div>
            </el-container>
        </article>
    </div>
</template>

<script>
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
                amount: 5
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .cart {
        &-title {
            padding: 40px 0 20px;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.2em;
            color: #333;
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

            i {
                font-size: 20px;
            }

            .item-wrapper {
                @include flex-center();
            }


            .item-tab-1 {
                width: 40%;

                i {
                    cursor: pointer;
                    color: #fff;
                    border: 1px solid #999;
                    border-radius: 50%;
                    margin: 0 30px;
                }

                .pic {
                    width: 80px;
                    display: inline-block;
                    margin-left: 20px;
                    border: 1px solid #e9e9e9;
                    padding-bottom: 78px;
                    position: relative;

                    .item-image{
                        position: absolute;
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
            }

            .item-tab-5 {
                width: 10%;
            }
        }
    }
</style>