<template>
    <div class="counter">
        <span class="minus" :class="{disabled: amount<=1}" @click.stop="minus">-</span>
        <span class="counter-number">{{amount}}</span>
        <span class="plus" @click.stop="plus">+</span>
    </div>
</template>

<script>
    export default {
        name: 'CartCounter',
        props: {
            amount: {
                type: Number,
                default: 1
            }
        },
        methods: {
            minus() {
                if (this.amount <= 1) {
                    return;
                }
                this.$emit('update:amount', this.amount - 1);
            },
            plus() {
                this.$emit('update:amount', this.amount + 1);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~assets/scss/mixins';
    .counter{
        display: flex;

        span{
            height: 32px;
            background-color: #eee;
            @include flex-center(column);
        }

        .minus,
        .plus{
            width: 32px;
            font-size: 20px;
            cursor: pointer;
        }

        & &-number {
            background-color: #fff;
            width: 40px;
            text-align: center;
            font-size: 14px;
            border: 1px solid #eee;
        }

        .minus{
            border-radius: 3px 0 0 3px;
        }

        .disabled{
            color: #ccc;
        }

        .plus{
            border-radius: 0 3px 3px 0;
        }
    }
</style>
