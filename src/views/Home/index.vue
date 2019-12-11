<template>
    <div class="home">
        <nav class="bread-wrapper">
            <nav-bread currentPage="Goods" class="content-wrapper"></nav-bread>
        </nav>

        <el-container>
            <el-main class="content-wrapper container">
                <el-row class="sort">
                    <span class="sortby"> Sort by: </span>
                    <a href="javascript:;" class="price">Price<i class="el-icon-top"></i></a>
                </el-row>

                <el-container>
                    <el-aside class="filter-wrapper" width="190px">
                        <home-filter></home-filter>
                    </el-aside>

                    <el-main class="list-wrapper">
                        <home-list></home-list>
                    </el-main>   
                </el-container>
            </el-main>    
        </el-container>
    </div>
</template>

<script>
    import NavBread from 'components/NavBread';
    import HomeFilter from './filter';
    import HomeList from './list'
    export default {
        name: 'home',
        components: {
            NavBread,
            HomeFilter,
            HomeList
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

            .el-icon-top {
                font-weight: 700;
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

    .list-wrapper {
       height: 1200px;
    }
</style>