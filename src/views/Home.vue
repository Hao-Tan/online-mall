<template>
    <div class="home">
        <section class="bread-wrapper">
            <nav-bread currentPage="Goods" class="content-wrapper"></nav-bread>
        </section>

        <el-contianer>
            <el-main class="content-wrapper container">
                <el-row class="filter">
                    Sort by: <a>Price <i class="el-icon-top"></i></a>
                </el-row>
            </el-main>    
        </el-contianer>
        
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
    }
</style>