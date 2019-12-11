<template>
    <div id="app">
        <nav-header></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from './components/NavHeader'
    import NavFooter from './components/NavFooter'
    export default {
        name: 'app',
        components: {
            NavHeader,
            NavFooter
        }
    }
</script>

<style>
</style>