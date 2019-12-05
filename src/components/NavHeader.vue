<template>
    <el-header class="header">
        <el-container class="header-nav">
            <a href="/" class="header-nav-logo">
                <img class="navbar-brand-logo" src="../assets/img/logo.png">
            </a>

            <el-container>
                <span class="navbar-link">nickname</span>
                <a href="javascript:;" class="navbar-link">Sign in</a>
                <a href="javascript:;" class="navbar-link">Sign out</a>
                <div class="navbar-cart-container">
                    <span class="navbar-cart-count">1</span>
                    <a class="navbar-link navbar-cart-link" href="/#/cart">
                        <i class="el-icon-shopping-cart-2"></i>
                    </a>
                </div>
            </el-container>
        </el-container>
        

        <el-container class="header-nav-account" direction="vertical">
            
            <div class="md-modal modal-msg md-modal-transition" style="display:none;">
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
        <div class="md-overlay"></div>
            
        </el-container>   
    </el-header>
</template>

<script>
    export default {
        name: 'NavHeader',
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
            @include flex-between;
            width: 100%;
            padding: 5px 30px 10px;
            max-width: 1280px;
            margin: 0 auto;

            .el-container{
                flex: 0;
            }
        }

        a {
            color: #666;
            text-decoration: none;
        }
    }
</style>