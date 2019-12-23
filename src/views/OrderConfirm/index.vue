<template>
    <div class="order-confirm">
        <div class="bread-wrapper">
            <nav-bread currentPage="Order Confirm" class="content-wrapper"></nav-bread>
        </div>
    </div>
</template>

<script>
    import NavBread from 'components/NavBread'
    export default {
        name: "OrderConfirm",
        components: {
            NavBread
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";

</style>