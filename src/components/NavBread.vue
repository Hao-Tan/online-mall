<template>
    <el-breadcrumb separator="/" class="navbread">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentPage }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "Navbread",
        props: ["currentPage"]
}
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    /deep/.el-breadcrumb__item {    
        .is-link:hover {
            color: #d1434a;
        }

        .is-link {
            color: #999
        }
    }

    .navbread {
        padding: 0 20px;
        @include flex-between(); 
        justify-content: flex-start;
    }
</style>