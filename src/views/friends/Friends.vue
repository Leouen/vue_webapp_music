<template>
  <div>
    <circular-progress-view
    @click="startTime()"
      v-if="isShow"
    ref="$circle"
    class="progress"
    key="duration-model"
    :isAnimation="false"
    :isRound="true"
    :width="width"
    :radius="radius"
    :progress="currentTime / durationTime * 100"
    :barColor="barColor"
    :duration="duration"
    :backgroundColor="backgroundColor"></circular-progress-view>
    <ul>
    <li>
      <label for="width">圆宽（px）:</label>
      <input v-model="width" type="number" placeholder="例如：140">
    </li>
    <li>
      <label for="radius">进度条宽度（px）:</label>
      <input v-model="radius" type="number" placeholder="例如：12">
    </li>
    <li>
      <label for="barColor">进度条颜色:</label>
      <input v-model="barColor" type="text" placeholder="例如：#f5a623">
    </li>
    <li>
      <label for="backgroundColor">背景颜色:</label>
      <input v-model="backgroundColor" type="text" placeholder="例如：#FFE8CC">
    </li>
    <li>
      <label for="duration">总时长（s）:</label>
      <input v-model="durationTime" type="number" placeholder="例如：1000">
    </li>
    <li>
      <div class="btn" @click="startTime">{{currentTime > 0 ? '重新计时' : '开始计时'}}</div>
    </li>
    </ul>
  </div>
</template>

<script>
import CircularProgressView from 'components/common/CPV/CPV'
export default {
  components: { CircularProgressView },
  name: 'PlayMusicMini',
  data () {
    return {
      isDurationModel: true, // 是否打开持续缓动模式
      isShow: true,
      width: 30,
      radius: 2,
      progress: 70,
      duration: 600,
      barColor: '#333',
      backgroundColor: '#d1d1d1',
      intervalTimer: null, // 持续模式，循环计时器
      currentTime: 33, // 当前时间
      durationTime: 6 // 持续模式总时长
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

<style scoped>
.TestFriend{
  font-size: 40px;
}
</style>
