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
                :loop='isLoop'
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
          <div class="modeBtn">
            <span v-if="$store.state.playlist.mode===1" @click="switchToRandom" class="iconfont icon-loop mode"></span>
            <span v-if="$store.state.playlist.mode===2" @click="switchToOneloop"  class="iconfont icon-random mode"></span>
            <span v-if="$store.state.playlist.mode===3" @click="switchToLoop"  class="iconfont icon-loop-one mode"></span>
          </div>
          <div class="backBtn" @click="backSong"><span class="iconfont icon-back"></span></div>
          <div class="playBtn" @click="toPlay">
            <span v-if="!$store.state.playlist.playing"  class="iconfont icon-play toPlay"></span>
            <span v-if="$store.state.playlist.playing" class="iconfont icon-pause toPlay"></span>
          </div>
          <div class="nextBtn" @click="nextSong"><span class="iconfont icon-next"></span></div>
          <div class="listBtn" @click="showSonglist"><span class="iconfont icon-songlist"></span></div>
      </div>
  </div>
</template>

<script>
import { playSong, getlyric } from 'network/playmusic'
import { toMs } from '@/common/utils'
export default {
  data () {
    return {
      isLoop: false,
      value: 0,
      bufferValue: 0,
      isChange: false
    }
  },
  methods: {
    showSonglist () {
      this.$store.commit('isShowPlaylist')
    },
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
      if (this.$store.state.playlist.mode === 3) {
        this.isLoop = true
      } else {
        this.isLoop = false
        document.querySelector('.nextBtn').click()
      }
    },
    switchToRandom () {
      this.$store.commit('playlist/setMode', 2)
      this.$toast({ message: '随机播放', className: 'toastShadow', position: 'bottom' })
    },
    switchToOneloop () {
      this.$store.commit('playlist/setMode', 3)
      this.$toast({ message: '单曲循环', className: 'toastShadow', position: 'bottom' })
    },
    switchToLoop () {
      this.$store.commit('playlist/setMode', 1)
      this.$toast({ message: '循环播放', className: 'toastShadow', position: 'bottom' })
    },
    nextSong () {
      if (this.$store.state.playlist.mode === 1 || this.$store.state.playlist.mode === 3) {
      // 目前的歌单下标 ！= 歌单的长度
        if (this.$store.state.playlist.plIndex !== this.$store.state.playlist.playlist.length - 1) {
          let index = this.$store.state.playlist.plIndex
          index += 1
          this.$store.commit('playlist/setplIndex', index) // 设置正在播放的下标
          let current = this.$store.state.playlist.playlist[index]
          this.getSongInfo(current)
        } else {
          let index = 0
          this.$store.commit('playlist/setplIndex', index) // 设置正在播放的下标
          let current = this.$store.state.playlist.playlist[index]
          this.getSongInfo(current)
        }
      } else if (this.$store.state.playlist.mode === 2) {
        let index = this.$store.state.playlist.plIndex
        index = Math.round(Math.random() * (this.$store.state.playlist.playlist.length - 1))
        this.$store.commit('playlist/setplIndex', index) // 设置正在播放的下标
        let current = this.$store.state.playlist.playlist[index]
        this.getSongInfo(current)
      }
    },
    backSong () {
      if (this.$store.state.playlist.mode === 1 || this.$store.state.playlist.mode === 3) {
      // 目前的歌单下标 ！= 歌单的长度
        if (this.$store.state.playlist.plIndex !== 0) {
          let index = this.$store.state.playlist.plIndex
          index -= 1
          this.$store.commit('playlist/setplIndex', index) // 设置正在播放的下标
          let current = this.$store.state.playlist.playlist[index]
          this.getSongInfo(current)
        } else {
          let index = this.$store.state.playlist.playlist.length - 1
          this.$store.commit('playlist/setplIndex', index) // 设置正在播放的下标
          let current = this.$store.state.playlist.playlist[index]
          this.getSongInfo(current)
        }
      } else if (this.$store.state.playlist.mode === 2) {
        let index = this.$store.state.playlist.plIndex
        index = Math.round(Math.random() * (this.$store.state.playlist.playlist.length - 1))
        this.$store.commit('playlist/setplIndex', index) // 设置正在播放的下标
        let current = this.$store.state.playlist.playlist[index]
        this.getSongInfo(current)
      }
    },
    getSongInfo (current) {
      playSong(current.id).then((res) => {
        // console.log(res)
        var musicUrl = res.data[0].url // 获得音乐url
        this.$store.commit('playlist/setCurrentSrc', musicUrl)
        this.$store.commit('playlist/updateCurrent', current)
      })
      getlyric(current.id).then((res) => {
        if (res.lrc) {
          this.$store.commit('playlist/setCurrentLyric', res.lrc.lyric)
        }
      })
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
    height: 20px;
    position: absolute;
    bottom: 56px;
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
  bottom: 12px;
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
