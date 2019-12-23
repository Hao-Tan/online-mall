<template>
    <div class="order-success">
        <div class="bread-wrapper">
            <nav-bread currentPage="Order Success" class="content-wrapper"></nav-bread>
        </div>
    </div>
</template>

<script>
    import NavBread from 'components/NavBread'
    export default {
        name: "OrderSuccess",
        components: {
            NavBread
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";

</style>