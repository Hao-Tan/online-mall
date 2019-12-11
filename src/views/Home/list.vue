<template>
    <div class="list-wrapper">
        <el-row 
            :gutter="20"
            tag="ul" 
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="busy">
            <el-col tag="li" class="item-wrapper" :xl="6" :lg="6" :md="8" :sm="12" :xs="24" v-for="item in data" :key="item">
                <div class="list-item">
                    {{item}}
                </div>
            </el-col>
        </el-row>
        <div class="loading"
            v-infinite-scroll="load"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="20">
            <i class="el-icon-loading"></i>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "HomeList",
        components: {

        },
        data() {
            return {
                data: 8,
                busy: false
            }
        },
        methods: {
            load() {
                // this.busy = true
                // setTimeout(() => {
                //     this.data += 2
                //     this.busy = false
                // }, 1000)
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