<template>
  <div class="home">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      /> -->
      <acticle-item v-for="(article ,index) in list" :key="index" :acticle="article"></acticle-item>
    </van-list>
  </div>
</template>

<script>
import { getActicles } from '@/api/acticle'
import ActicleItem from '../arcticle-item'
export default {
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false // 控制数据加载结束的状态
    }
  },
  name: 'ArticleList',
  components: {
    ActicleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const data = await getActicles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data.data.data
        // 数组的展开操作符 把数组的元素一个一个拿出来
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = false
        }
      } catch (err) {
        console.log('请求失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
}
</style>>
