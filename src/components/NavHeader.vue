<template>
    <el-container class="header">
        <el-header class="header-nav">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- <el-dialog class="sign-container">
            <div class="md-modal modal-msg md-modal-transition">
                <div class="md-modal-inner">
                    <div class="md-top">
                        <div class="md-title">Login in</div>
                        <button class="md-close">Close</button>
                    </div>
                    <div class="md-content">
                        <div class="confirm-tips">
                            <div class="error-wrap">
                                <span class="error error-show">用户名或者密码错误</span>
                            </div>
                            <ul>
                                <li class="regi_form_input">
                                    <i class="icon IconPeople"></i>
                                    <input type="text" tabindex="1" name="loginname"
                                        class="regi_login_input regi_login_input_left" placeholder="User Name"
                                        data-type="loginname">
                                </li>
                                <li class="regi_form_input noMargin">
                                    <i class="icon IconPwd"></i>
                                    <input type="password" tabindex="2" name="password"
                                        class="regi_login_input regi_login_input_left login-input-no input_text"
                                        placeholder="Password">
                                </li>
                            </ul>
                        </div>
                        <div class="login-wrap">
                            <a href="javascript:;" class="btn-login">登 录</a>
                        </div>
                    </div>
                </div>
            </div>    
        </el-dialog>    -->
    </el-container>
</template>

<script>
    export default {
        name: 'NavHeader',
        data() {
            return {
                dialogVisible: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";

    .header {
        width: 100%; 
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

        a {
            color: #666;
            text-decoration: none;
        }
    }

    .el-dialog__wrapper {
        @include flex-center();

    }
</style>