<template>
  <van-cell>
    <template #title>
      {{acticle.title}}
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    acticle: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
