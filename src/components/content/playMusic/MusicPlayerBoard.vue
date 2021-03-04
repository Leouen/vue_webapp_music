<template>
  <div class="play-board">
    <img id="needle" class="play-needle pause-needle" :class="{resumeNeedle: $store.state.playlist.playing}" src="~assets/img/playmusic/play_needle.png"/>
    <div class="disk-bg"></div>
    <div class="board-middle">
      <swiper ref="mySwiper" :options="swiperOption" class="swiper-container" @slideNextTransitionStart='nextSong' @slidePrevTransitionEnd='backSong'>
        <swiper-slide>
          <div class="disk-cover disk-cover-animation" :class="{animePause: !$store.state.playlist.playing}">
              <img class="disk-border" src="~assets/img/playmusic/play_disc.png"/>
              <img class="album" @load="imgLoad" v-show="imgShow" :src="$store.state.playlist.current.picUrl"/>
              <img class="album" v-show="!imgShow" src="~assets/img/playmusic/play_disc2.png"/>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div id="diskBar">
      <div><span class="iconfont icon-aixin1"></span></div>
      <div><span class="iconfont icon-download"></span></div>
      <div><span class="iconfont icon-rate1 rate"></span></div>
      <div><span class="iconfont icon-liuyan"></span></div>
      <div><span class="iconfont icon-ziyuan"></span></div>
    </div>
  </div>
</template>

<script>
import { playSong, getlyric } from 'network/playmusic'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'playBoard',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      picUrl: null,
      imgShow: false,
      swiperOption: {
        // 循环
        loop: true,
        navigation: {
          nextEl: '.nextBtn',
          prevEl: '.backBtn'
        }
      }
    }
  },
  created () {
  },
  watch: {

  },
  methods: {
    imgLoad () {
      this.imgShow = true
      console.log('我加载好了')
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
  }
}
</script>

<style>
.play-board {
    position: absolute;
    overflow: hidden;
    top: 8%;
    width: 100%;
    height: 82%;
    color: white;
}
.board-middle>div{
  height: 400px;
}
.play-needle {
    position: absolute;
    top: 0px;
    left: 49%;
    margin: 0px -12px;
    z-index: 10;
    width: 100px;
    transform-origin: 20px 20px;
    transition: transform 0.3s;
    -webkit-transform-origin: 20px 20px;
    -webkit-transition: -webkit-transform 0.3s;
}

.pause-needle {
    transform: rotateZ(-25deg);
    -webkit-transform: rotateZ(-25deg);
}

.resumeNeedle {
    transform: rotateZ(-1deg);
    -webkit-transform: rotateZ(-1deg);
}

.disk-cover {
    width: 280px;
    height: 280px;
    position: absolute;
    left: 50%;
    top: 98px;
    margin: 0% -140px;
}

.disk-cover-animation {
    animation: rotate-disk 20s infinite normal linear;
}
.animePause{
  animation-play-state: paused;
}
@keyframes rotate-disk {
    100% {
        transform: rotateZ(360deg);
    }
}
@keyframes switch-needle {
    0% {
        transform: rotateZ(-25deg);
    }
    50%{
        transform: rotateZ(-1deg)
    }
}
.switchNeedle{
  animation: switch-needle 1s normal linear;
}
.disk-transition {
    transition: left 0.8s ease-in-out;
    -webkit-transition: left 0.8s ease-in-out;
}

.disk-cover img {
    display: block;
    width: 100%;
}

.disk-cover .album {
    width: 68%;
    height: 68%;
    margin: 16%;
    border-radius: 50%;
}

.disk-cover .disk-border {
    position: absolute;
    top: 0px;
}
/** 唱片底部导航栏 */
#diskBar{
  width: 295px;
  position: absolute;
  bottom: 20px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#diskBar>div .iconfont{
  color: #ffffffcc;
}
#diskBar>div{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
#diskBar .iconfont.rate{
  font-size: 36px;
}
</style>
