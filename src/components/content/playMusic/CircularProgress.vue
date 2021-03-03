<template>
  <div class="CircularProgress">
    <div class="progress">
      <circular-progress-view
      v-if="isShow"
      ref="$circle"
      key="duration-model"
      :isAnimation="false"
      :isRound="true"
      :width="width"
      :radius="radius"
      :progress="$store.state.playlist.currentSec / $store.state.playlist.currentRate"
      :barColor="barColor"
      :backgroundColor="backgroundColor">
      </circular-progress-view>
    </div>
  </div>
</template>

<script>
import CircularProgressView from 'components/common/CPV/CPV'
export default {
  name: 'CircularProgress',
  components: { CircularProgressView },
  data () {
    return {
      isDurationModel: true, // 是否打开持续缓动模式
      isShow: true,
      width: 24,
      radius: 2,
      progress: 100,
      barColor: '#333',
      backgroundColor: '#d1d1d1'
    }
  },

  watch: {
    isDurationModel () {
      clearInterval(this.intervalTimer)
      // this.currentTime = 0
    }
  },

  methods: {
    // 重置动画
    reset () {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  }
}
</script>

<style>

</style>
