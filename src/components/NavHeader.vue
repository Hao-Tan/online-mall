<template>
    <el-header class="header">
        <el-header class="header-nav content-wrapper">
            <a href="/" class="logo">
                <img class="navbar-brand-logo" src="../assets/img/logo.png">
            </a>

            <div class="account">
                <span class="account-link">nickname</span>
                <a href="javascript:;" class="account-link" @click="dialogVisible = true">Sign in</a>
                <a href="javascript:;" class="account-link">Sign out</a>
                <div class="cart-container">
                    <span class="cart-count">1</span>
                    <a class="cart-link" href="/#/cart">
                        <i class="el-icon-shopping-cart-2"></i>
                    </a>
                </div>
            </div>
        </el-header>
        
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            top="0"
            center
            title="Sign in">
            <el-col class="account-info">
                <el-row class="error-wrapper">
                    <span v-show="errorTip">用户名或密码错误</span>
                </el-row>
                
                <el-input 
                    class="account-info-input account-username" 
                    placeholder="User Name"
                    prefix-icon="el-icon-user"
                    size="large"
                    v-model="username"
                ></el-input>
                <el-input 
                    class="account-info-input account-password" 
                    placeholder="Password"
                    type="password"
                    prefix-icon="el-icon-lock"
                    v-model="password"
                    ></el-input>
            </el-col>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">登 录</el-button>
            </span>
        </el-dialog>
    </el-header>
</template>

<script>
    export default {
        name: 'NavHeader',
        data() {
            return {
                dialogVisible: false,
                username: "",
                password: "",
                errorTip: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";

    .header {
        width: 100%; 
        height: 70px;
        background-color: #fff;
        @include flex-center();
        flex-direction: column;
        
        &-nav {
            width: 100%;
            padding: 5px 30px 10px;
            max-width: 1280px;
            min-width: 375px;
            margin: 0 auto;
            @include flex-between(); 

            .account {
                @include flex-between();

                &-link {
                    padding-left: 15px;
                }

                .cart-container{
                    padding-left: 15px;
                    position: relative;
                    
                    .cart-link {
                        font-size: $icon-font-size;
                    }

                    .cart-count{
                        position: absolute;
                        top: -6px;
                        right: -10px;
                        width: 20px;
                        height: 20px;
                        @include flex-center();
                        background-color: #eb767d;
                        color: #fff;
                        font-weight: 700;
                        border-radius: 50%;
                    }
                }
            }
        }
    }

    .el-dialog__wrapper {
        @include flex-center();

        .error-wrapper {
            color: #eb767d;
            width: 80%;
            margin-bottom: 5px;
        }

        .account-info {
            @include flex-center(column)
        }

        .account-info-input {
            width: 80%;
            margin-bottom: 15px;
        }
    }
</style>