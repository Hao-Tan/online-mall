<template>
    <div class="order-confirm">
        <div class="bread-wrapper">
            <nav-bread currentPage="Order Confirm" class="content-wrapper"></nav-bread>
        </div>

        <article class="order">
            <el-container class="content-wrapper" direction="vertical">
                <h2 class="g-page-title">
                    CHECK OUT
                </h2>
                <pay-step :stepIndex="2" class="g-page-step"></pay-step>
                <h2 class="g-sub-title">
                    ORDER CONTENT
                </h2>
                <table class="order-list">
                    <thead class="order-list-head">
                        <td>ORDER ITEM</td>
                        <td>PRICE</td>
                        <td>QUANTITY</td>
                        <td>SUBTOTAL</td>
                    </thead>

                </table>    
            </el-container>
        </article>
    </div>
</template>

<script>
    import NavBread from 'components/NavBread';
    import PayStep from 'components/PayStep';
    export default {
        name: "OrderConfirm",
        components: {
            NavBread,
            PayStep
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .order-list-head {
        background-color:#605f5f;
        color: #fff;
        letter-spacing: 0.25em;

        & td {
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
        }
    }

</style>