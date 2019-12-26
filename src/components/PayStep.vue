<template>
    <ul class="step-wrapper">
        <li :class='{"completed": stepIndex >= 1}'>Confirm Address</li>
        <li :class='{"completed": stepIndex >= 2}'>View Your Order</li>
        <li :class='{"completed": stepIndex >= 3}'>Make Payment</li>
        <li :class='{"completed": stepIndex >= 4}'>Order Confirmation</li>
    </ul>
</template>

<script>
export default {
    name: "PayStep",
    props: ["stepIndex"]
}
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .step-wrapper {
        display: flex;
        width: 100%;

        li {
            flex: 1;
            border-bottom: 2px solid #ccc;
            position: relative;
            @include flex-center();
            align-items: flex-start;
            height: 40px;
            color: #ccc;
            font-size: 14px;
            font-weight: 700;

            &:after {
                position: absolute;
                content:"";
                bottom: -7px;
                left: 50%;
                margin-left: -7px;
                background-color: #ccc;
                width: 14px;
                height: 14px;
                border-radius: 50%;
            }

            &.completed {
                color: #d1434a;
                border-color: #d1434a;

                &:after {
                    background-color: #d1434a;
                }
            }
        }
    }
</style>