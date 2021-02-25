<template>
  <div class="CircularProgress">
    <div  @click="startTime" class="progress">
      <circular-progress-view
      v-if="isShow"
      ref="$circle"
      key="duration-model"
      :isAnimation="false"
      :isRound="true"
      :width="width"
      :radius="radius"
      :progress="currentTime / durationTime * 100"
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
      progress: 70,
      barColor: '#333',
      backgroundColor: '#d1d1d1',
      intervalTimer: null, // 持续模式，循环计时器
      currentTime: 0, // 当前时间
      durationTime: 60 // 持续模式总时长
    }
  },

  watch: {
    isDurationModel () {
      clearInterval(this.intervalTimer)
      this.currentTime = 0
    }
  },

  methods: {
    // 重置动画
    reset () {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    },

    // 开始计时
    startTime () {
      let spaceTime = 10
      clearInterval(this.intervalTimer)
      this.currentTime = 0
      this.intervalTimer = setInterval(() => {
        this.currentTime += spaceTime / 1000
        if (this.currentTime >= this.durationTime) {
          clearInterval(this.intervalTimer)
        }
      }, spaceTime)
    }
  }
}
</script>

<style>

</style>
