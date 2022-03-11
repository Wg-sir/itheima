<template>
  <div>
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item to='/home'>
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        {{ $store.state.user ? '我的' : '未登录' }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
