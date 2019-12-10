<template>
    <div>
        <el-row 
            :gutter="20"
            tag="ul" 
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="busy"
            style="overflow:auto">
            <el-col tag="li" class="item-wrapper" :xl="6" :lg="6" :md="8" :sm="12" :xs="24" v-for="item in data" :key="item">
                <div class="list-item">
                    {{item}}
                </div>
            </el-col>
        </el-row>
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
                //this.data +=4;
                
            }
        },
}
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .list {

        &-item {
            height: 600px;
            background-color: #fff;
            margin-bottom: 20px;
        }
    }

    .scroll {
        width: 100%;
        @include flex-center();

        i {
            font-size: 40px;
        }
    }
</style>