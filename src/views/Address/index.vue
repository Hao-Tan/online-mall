<template>
    <div class="address">
        <div class="bread-wrapper">
            <nav-bread currentPage="Address" class="content-wrapper"></nav-bread>
        </div>
    </div>
</template>

<script>
    import NavBread from 'components/NavBread'
    export default {
        name: "Address",
        components: {
            NavBread
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";

</style>