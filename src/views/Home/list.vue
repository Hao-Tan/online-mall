<template>
    <div class="list-wrapper">
        <el-row 
            :gutter="20"
            tag="ul" 
            class="list">
            <el-col tag="li" class="item-wrapper" :xl="6" :lg="6" :md="8" :sm="12" :xs="24" v-for="(item, index) in goodsList" :key="index">
                <div class="list-item">
                    {{item.salePrice}}
                </div>
            </el-col>
        </el-row>
        <div 
            class="loading"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="20">
            <i class="el-icon-loading"></i>
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios';
    export default {
        name: "HomeList",
        components: {

        },
        data() {
            return {
                busy: false,
                goodsList: [],
                page: 1,
                pageSize: 8,
            }
        },
        props: ["priceLevel", "sort"],
        created() {
            this.getGoods();
        },
        methods: {
            getGoods() {
                axios.get("/goods/list", {
                    params: {
                        page: this.page,
                        pageSize: this.pageSize,
                        sort: this.sort+1,
                        priceLevel: this.priceLevel
                    }
                }).then(response => {
                    let res = response.data;
                    if (res.status === "0") {
                        this.goodsList = this.goodsList.concat(res.result.list)
                        this.busy = false;
                    }
                })
            },
            loadMore() {
                setTimeout(() => {
                    this.page++;
                    this.getGoods();
                }, 500);
            }
        },
}
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .list {
        overflow: auto;

        &-item {
            height: 600px;
            background-color: #fff;
            margin-bottom: 20px;
        }
    }

    .loading {
        width: 100%;
        height: 60px;
        overflow: hidden;
        position: relative;
        @include flex-center();

        i {
            font-size: 40px;
        }
    }
</style>