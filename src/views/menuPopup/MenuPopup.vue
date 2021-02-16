<template>
  <div class="MenuPopup">
    <van-popup v-model="show" position="left" :style="{ width: '82%', height: '100%' }">
      <van-nav-bar  left-text="立即登陆" right-text="按钮" left-arrow />
        <div v-for="item in 400" :key="item">li{{item}}</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'MenuPopup',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.$Bus.$on('openPopup', () => {
      this.show = true
    })
  }
}
</script>

<style>

</style>
