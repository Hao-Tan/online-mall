<template>   
    <dl class="filter-price">
        <dt class="filter-tag">PRICE:</dt>
        <dd class="filter-item" @click="chooseOne('all')">
            <a href="javascript:;" :class="{cur: 'all'=== priceLevel}">
                All
            </a>    
        </dd>
        <dd class="filter-item" v-for="(item,index) in filterList" :key="index" @click="chooseOne(index)">
            <a href="javascript:;" :class="{cur: index == priceLevel}" >
                {{item.startPrice}} - {{item.endPrice}}
            </a>
        </dd>
    </dl>
</template>

<script>
    export default {
        name: "HomeFilter",
        data() {
            return {
                priceLevel: "all",
                filterList: [
                    {
                        startPrice:'0.00',
                        endPrice:'100.00'
                    },
                    {
                        startPrice:'100.00',
                        endPrice:'500.00'
                    },
                    {
                        startPrice:'500.00',
                        endPrice:'1000.00'
                    },
                    {
                        startPrice:'1000.00',
                        endPrice:'5000.00'
                    }
                ]
            }
        },
        methods: {
            chooseOne(index) {
                this.priceLevel = index;
                this.$emit("choosePrice",index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .filter {

        &-tag {
            letter-spacing: 0.25em;
            font-weight: 700;
            margin-bottom: 30px;
        }

        &-item {
            margin: 20px 0;
            padding: 5px 0;

            & a {
                width: 100%;
                display: block;
                transition: padding-left 0.3s ease-out;
            }

            & a:hover {
                color: #ee7a23;
                padding-left: 15px;
                border-left: 2px solid #ee7a23;
                transition: padding-left 0.3s ease-out;
            }

            .cur {
                font-weight: 700;
                padding-left: 15px;
                border-left: 2px solid #ee7a23;
                color: #ee7a23
            }
        }
    }
</style>