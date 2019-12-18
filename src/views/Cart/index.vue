<template>
    <div class="infinite-list-wrapper" style="overflow:auto">
        <ul>
            <li v-for="i in count" class="list-item" :key="i">{{ i }}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        count: 10,
        loading: false
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
    li {
        height: 40px;
        background-color: #969;
    }

    .infinite-list-wrapper {
        height: 100px;
    }
</style>