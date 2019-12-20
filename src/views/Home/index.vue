<template>
    <div class="home">
        <nav class="bread-wrapper">
            <nav-bread currentPage="Goods" class="content-wrapper"></nav-bread>
        </nav>

        <el-container>
            <el-main class="content-wrapper container">
                <el-row class="sort">
                    <span class="sortby"> Sort by: </span>
                    <a href="javascript:;" class="price" @click="sortGoods">Price<i class="el-icon-top" :class="{descend: sort === -1}"></i></a>
                </el-row>

                <el-container>
                    <el-aside class="filter-wrapper" width="190px">
                        <home-filter @choosePrice="choosePrice"></home-filter>
                    </el-aside>

                    <el-main class="list-wrapper">
                        <el-row 
                            :gutter="20"
                            tag="ul" 
                            class="list">
                            <el-col tag="li" class="item-wrapper" :xl="6" :lg="6" :md="8" :sm="12" :xs="24" v-for="(item, index) in goodsList" :key="index">
                                <div class="list-item">
                                    <div class="pic">
                                        <img v-lazy="require('assets/img/' + item.productImage)">
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice | currency("¥")}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="add-btn" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>

                        <!-- 滚动条，无限滚动加载数据，指定监听body的滚动条，identifier则用于排序或分组时重载该组件 -->
                        <infinite-loading @infinite="infiniteHandler" forceUseInfiniteWrapper="body" :identifier="identifier"></infinite-loading>
                    </el-main>   
                </el-container>
            </el-main>    
        </el-container>

        // 添加成功时的弹窗
        <el-dialog
            :visible.sync="mdCartShow"
            width="30%"
            top="0"
            center
            class="mdcart">
            <el-row 
                type="flex"
                justify="center"
                align="middle">
                <i class="el-icon-circle-check"></i>
                <span>加入购物车成功!</span>
            </el-row>
            <span slot="footer">
                <el-button @click.native="mdCartShow = false" class="continue mdcart-btn">继续购物</el-button>
                <el-button type="primary" @click.native="checkCart" class="check-cart mdcart-btn">查看购物车</el-button>
            </span>
        </el-dialog>

        // 添加失败时的弹窗
        <el-dialog
            :visible.sync="mdShow"
            width="30%"
            top="0"
            center
            class="mdcart">
            <el-row 
                type="flex"
                justify="center"
                align="middle">
                <span>您当前尚未登录！</span>
            </el-row>
            <el-button @click.native="mdShow = false" class="continue mdcart-btn" slot="footer" style="width:50%;">关闭</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import NavBread from 'components/NavBread';
    import HomeFilter from './filter';
    import axios from 'axios';
    export default {
        name: 'home',
        components: {
            NavBread,
            HomeFilter,
            InfiniteLoading
        },
        data() {
            return {
                priceLevel: "all",
                sort: 1,  // -1降序，1升序
                goodsList: [],
                page: 1,
                pageSize: 8,
                identifier: '',
                mdCartShow: false,
                mdShow: false
            }
        },
        watch: {
            sort() {
                this.page = 1;
                this.goodsList = [];
                this.identifier = new Date();
            }
        },
        methods: {
            // 按价格区间输出
            choosePrice(index) {
                this.priceLevel = index;
                this.page = 1;
                this.goodsList = [];
                this.identifier = new Date();
            },
            // 排序
            sortGoods() {
                this.sort = 0 - this.sort;
            },

            // 无限滚动的监听处理，重载会自动执行一次
            infiniteHandler($state) {
                axios.get("/goods/list", {
                    params: {
                        page: this.page,
                        pageSize: this.pageSize,
                        sort: this.sort,
                        priceLevel: this.priceLevel
                    }
                }).then(({ data }) => {
                    if (data.result.count) {
                        this.goodsList.push(...data.result.list);
                        if (data.result.count === 8) {
                            this.page += 1;
                            $state.loaded();
                        } else {
                            $state.complete();
                        }    
                    }
                });
            },

            // 添加商品至购物车
            addCart(productId) {
                axios.post("/users/addCart", {
                    productId: productId
                }).then(({data}) => {
                    if (data.status === "0") {
                        this.mdCartShow = true;
                    } else {
                        this.mdShow = true;
                    }
                })
            },

            checkCart() {
                this.$router.push("/cart");
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .bread-wrapper {
        background-color: #f0f0f0;
        height: $navbar-height;
        @include flex-between();
        justify-content: flex-start;
    }

    .container {
        padding: 0;
        margin-top: 60px;
    }

    .sort {
        background-color: #fff;
        color: #605f5f;
        @include flex-center();
        justify-content: flex-end;
        margin: 0 0 30px;
        padding: 0 20px;
        height: 55px;
        font-size: $font-size-base - 2px;

        .price {
            padding: 0 15px;

            .descend{
                transform: rotate(180deg);
                transition: all 0.3s ease-out;
            }

            .el-icon-top {
                font-weight: 700;
                transition: all 0.3s ease-out;
            }

            &:hover {
                color: #ee7a23;
                transition: color 0.3s
            }
        }
    }

    .filter-wrapper {
        padding: 0 20px;
        margin-right: 25px;
        color: #605f5f;
        font-size: 14px;
        min-height: 200px;
    }

    .list {
        &-wrapper {
            padding: 15px;
        }

        &-item {
            background-color: #fff;
            border: 2px solid #e9e9e9;
            margin-bottom: 20px;
            transition: all 0.3s ease-out;
            font-size: 14px;

            &:hover {
                border-color: #ee7a23;
                box-shadow: 0 0 10px #999;
                transform: translateY(-5px);
                transition: all 0.3s ease-out;
            }

            .pic {
                padding-bottom: 100%;
                width: 100%;
                height: 0;

                img {
                    width: 100%;;
                }
            }

            .main {
                padding: 20px 10px 10px;

                .name {
                    @include ellipsis();
                    height: 4em;
                    line-height: 1.25em;
                    font-weight: 700;
                }

                .price {
                    font-size: 1.25em;
                    color: #d1434a;
                    line-height: 2em;
                    letter-spacing: 0.05em;
                    padding-bottom: 5px;
                }

                .add-btn {
                    letter-spacing: 0.25em;
                    color: #d1434a;
                    border: 1px solid #d1434a;
                    font-weight: 700;
                    width: 100%;
                    display: inline-block;
                    line-height: 3em;
                    height: 3em;
                    text-align: center;

                    &:hover {
                        background-color: #ffe5e6;
                    }
                }
            }
        }
    }

    /deep/.mdcart {
        i {
            margin-right: 20px;
            font-size: 20px;
            color: #ee7a23;
        }

        &-btn, &-btn:hover {
            border-radius: 0px;
            border: 1px solid #d1434a;
            margin-bottom: 20px;
            letter-spacing: 0.2em;
            font-weight: 700;
        }

        .continue{
            color: #d1434a;

            &:hover {
                background-color: #ffe5e6;
            }
        }

        .check-cart {
            background-color: #d1434a;

            &:hover {
                background: #f16f75;
                border-color: #f16f75;
            }
        }
    }
</style>