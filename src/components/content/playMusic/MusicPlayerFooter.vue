<template>
  <div id="MusicPlayerFooter">
      <div class="process" id="process">
          <span id="currentTime">{{$store.state.playlist.currentSec | toMs}}</span>
          <div class="process-bar">
              <van-slider id="bufferBar" v-model="bufferValue"/>
              <van-slider
                v-model="$store.state.playlist.currentValue"
                @change="onChange"
                @touchstart.native="isChange = true"
                @touchend.native="isChange = false"
              />
              <audio id="myAudio"
                ref="myAudio"
                autoplay
                :src="$store.state.playlist.current.src"
                @canplay="initAudio"
                @timeupdate="updateTime"
                @play="whenPlay"
                @pause="whenPause"
                @ended="whenEnded"
              ></audio>
          </div>
          <span id="totalTime">{{$store.state.playlist.currentTotalSec | toMs}}</span>
      </div>
      <div class="control" id="controls">
          <div class="modeBtn"><span class="iconfont icon-loop mode"></span></div>
          <div class="backBtn"><span class="iconfont icon-back"></span></div>
          <div class="playBtn" @click="toPlay">
            <span v-if="!$store.state.playlist.playing"  class="iconfont icon-play toPlay"></span>
            <span v-if="$store.state.playlist.playing" class="iconfont icon-pause toPlay"></span>
          </div>
          <div class="nextBtn"><span class="iconfont icon-next"></span></div>
          <div class="listBtn"><span class="iconfont icon-songlist"></span></div>
      </div>
  </div>
</template>

<script>
import { toMs } from '@/common/utils'
export default {
  data () {
    return {
      value: 0,
      bufferValue: 0,
      isChange: false
    }
  },
  methods: {
    onChange (value) {
      // 拖动进度条后，改变audio元素的目前已经播放的时长
      this.$refs.myAudio.currentTime = value * this.$store.state.playlist.currentRate
    },
    toPlay () {
      this.$store.commit('playlist/setPlaying')
      this.$store.state.playlist.audioDom.paused === true ? this.$store.state.playlist.audioDom.play() : this.$store.state.playlist.audioDom.pause()
    },
    updateTime () {
      if (this.isChange === true) return
      this.$store.commit('playlist/initAudio', this.$refs.myAudio)
      this.$store.commit('playlist/setCurrentSec', this.$refs.myAudio.currentTime) // 获取当前播放时间，放进vuex
      this.$store.commit('playlist/setCurrentValue') // 当前进度 = 当前秒数 / 步数（比率）
      if (this.$refs.myAudio.buffered.length !== 0) {
        // 缓存条数值
        this.bufferValue = Math.floor(this.$refs.myAudio.buffered.end(0) / this.$refs.myAudio.duration * 100)
      }
    },
    initAudio () {
      this.$store.commit('playlist/initAudio', this.$refs.myAudio) // audio dom元素
      this.$store.commit('playlist/setCurrentTotalSec', this.$refs.myAudio.duration) // 音频时长
      this.$refs.myAudio.volume = 0.3 // 初始化 音量
    },
    whenPlay () {
      this.$store.commit('playlist/setPlayingTrue')
    },
    whenPause () {
      this.$store.commit('playlist/setPlayingFalse')
    },
    whenEnded () {
      this.$store.commit('playlist/setPlayingFalse')
    }
  },
  filters: {
    toMs
  }
}
</script>

<style>
/* 进度条  */
.process {
    width: 350px;
    height: 50px;
    position: absolute;
    bottom: 40px;
    margin: 0px -175px;
    left: 50%;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
}
.process .process-bar {
    position: absolute;
    left: 36px;
    width: 280px;
    margin-top: 6.5px;
}
.process .van-slider__button{
  height: 12px;
  width: 12px;
}
/** 未加载的颜色 */
.process .van-slider{
  background: #ffffff30;
}
/** 加载的颜色 */
.process .van-slider__bar{
  background: #FFF;
}

/** 缓存条 */
#bufferBar{
  position: absolute;
  top:0px;
}
#bufferBar .van-slider__button{
  display: none;
}
#bufferBar .van-slider__bar{
  background: #b4b2b2;
}

/********************* */

.process > span:first-child {
    position: absolute;
    left: -2px;
    color: #ffffff;
}

.process > span:last-child {
    position: absolute;
    right: -5px;
    color: #ffffff55;
}

.control {
  width: 295px;
  position: absolute;
  bottom: 16px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.control>div{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*****  图标相关***************** */
#MusicPlayerFooter>div .iconfont{
  color: #ffffffcc;
}
#MusicPlayerFooter .iconfont.icon-songlist{
  font-size: 32px;
  padding-bottom: 1px;
}
#MusicPlayerFooter .iconfont.toPlay{
  font-size: 40px;
  color: #ffffff
}
#MusicPlayerFooter .iconfont.mode{
  font-size: 26px;
}
</style>
