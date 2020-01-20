<template>
    <el-footer class="footer">
        <el-row class="content-wrapper" type="flex" align="center">
            <el-col class="footer-region" :span="6">
                <span>Region</span>
                <select class="footer-region-select">
                    <option value="en-US">USA</option>
                    <option value="zh-CN">China</option>
                </select>
            </el-col>
            <el-col class="footer-more" :span="18">
                <span>Copyright ©2017 All Rights Reserved.</span>
                <a href="#">
                    About Us
                </a>
                <a href="#">
                    Terms &amp; Conditions
                </a>
                <a href="#">
                    Privacy Policy
                </a>
            </el-col>
        </el-row>
        <a :style="{marginBottom: '20px'}" href="http://www.beian.miit.gov.cn/" target="_blank">蜀ICP备20002578号</a>
    </el-footer>
</template>

<script>
export default {

}
</script>

<style  lang="scss" scoped>
    @import "~assets/scss/mixins";
    .footer {
        position: absolute;
        bottom: 0;
        width: 100%; 
        color: #ada9a5;
        font-size: 14px;
        font-weight: 100;
        min-height: 100px;
        letter-spacing: 0.05em;
        @include flex-center(column);

        .content-wrapper {
            border-top: #ada9a5 1px solid;
            height: 100%;
        }

        &-region {
            @include flex-center();
            justify-content: flex-start;
            padding-left: 30px;

            &-select {
                color: black;
                width: 70px;
                border: 1px solid #ada9a5;
                margin-left: 5px;
            }
        }

        &-more {
            @include flex-center();
            justify-content: space-between;
            padding-right: 30px;    

            a {
                color: #ada9a5
            }
        }

    }
</style>