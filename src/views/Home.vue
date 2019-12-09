<template>
    <div class="home">
        <el-contianer class="bread-wrapper">
            <nav-bread currentPage="Goods" class="content-wrapper"></nav-bread>
        </el-contianer>

        <el-container>
            <el-main class="content-wrapper container">
                <el-row class="filter">
                    <span class="sortby"> Sort by: </span><a href="javascript:;" class="price">Price <i class="el-icon-top"></i></a>
                </el-row>
            </el-main>    
        </el-container>
        
    </div>
</template>

<script>
    import NavBread from 'components/NavBread';
    export default {
        name: 'home',
        components: {
            NavBread
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

    .filter {
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
</style>