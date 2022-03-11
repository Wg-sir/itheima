<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <template #title>
        <van-button class="search-btn" type="info" size="small" round>
          <template #icon>
            <i class="toutiao toutiao-sousuo"></i>
          </template>
          <span>搜索</span>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable >
      <template #nav-right>
        <i class="toutiao toutiao-gengduo hamburger-btn"></i>
        <i class="placeholder"></i>
      </template>
      <van-tab v-for="obj in UserList" :key="obj.id" :title="obj.name">
        <ArticleList :channel = obj />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/arcticle'
export default {
  data () {
    return {
      active: 0,
      UserList: []
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.userChannels()
  },
  methods: {
    async userChannels () {
      try {
        const data = await getUserChannels()
        // console.log(123)
        // console.log(data)
        this.UserList = data.data.data.channels
      } catch (err) {
        this.$toast('获取频道列表失败')
        console.dir(err)
      }
    }
  },
  name: 'HomeIndex'
}
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .toutiao-sousuo {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .vant-tabs_wrap {
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder{
      flex-shrink: 0;  //不参与flex布局的剩余空间平分
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      font-size: 33px;
    }
    &:before {
      content: '';
      width: 10px;
      height: 100%;
      left: 0;
    }
  }
}
</style>
