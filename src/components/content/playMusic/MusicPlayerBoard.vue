<template>
  <div class="play-board">
    <img id="needle" class="play-needle pause-needle" :class="{resumeNeedle: $store.state.playlist.playing&&pause}" src="~assets/img/playmusic/play_needle.png"/>
    <div class="disk-bg"></div>
    <div class="board-middle" >
      <swiper ref="mySwiper"
       :options="swiperOption"
       class="swiper-container"
      @slideNextTransitionStart='nextSong'
      @slidePrevTransitionStart='backSong'
      @slideChangeTransitionEnd='setIsActive'
      @touchMove='pause=false'
      @touchEnd='pause=true'
      >
        <swiper-slide>
          <div class="disk-cover disk-cover-animation" :class="{animePause: !pause||!$store.state.playlist.playing}">
              <img class="disk-border" src="~assets/img/playmusic/play_disc.png"/>
              <img class="album songImg" @load="loadingShow" v-show="loadShow" v-if="$store.state.playlist.isActive"  :src="$store.state.playlist.current.picUrl"/>
              <img class="album" v-show="!$store.state.playlist.isActive" src="~assets/img/playmusic/play_disc2.png"/>
              <img  class="backgroundImg" src="~assets/img/playmusic/play_disc2.png" alt="">
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="disk-cover disk-cover-animation" :class="{animePause: !pause||!$store.state.playlist.playing}">
              <img class="disk-border " src="~assets/img/playmusic/play_disc.png"/>
              <img class="album songImg" @load="loadingShow" v-show="loadShow" v-if="!$store.state.playlist.isActive" :src="$store.state.playlist.current.picUrl"/>
              <img class="album" v-show="$store.state.playlist.isActive" src="~assets/img/playmusic/play_disc2.png"/>
              <img  class="backgroundImg" src="~assets/img/playmusic/play_disc2.png" alt="">
          </div>
        </swiper-slide>
      </swiper>
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
      pause: true,
      loadShow: false,
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
      this.$store.dispatch('playlist/nextSong')
    },
    backSong () {
      this.$store.dispatch('playlist/backSong')
    },
    setIsActive () {
      this.$store.commit('playlist/setIsActive')
      this.loadShow = false
      document.querySelector('.playerBg').classList.remove('fadeIn')
    },
    loadingShow () {
      let img = document.querySelector('.songImg')
      if (img.complete === true) {
        this.loadShow = true
      } else {
        this.loadShow = false
      }
    },
    swichModeRate (number, rate) {
      this.$store.commit('playlist/swichModeRate', number)
      this.$store.state.playlist.audioDom.playbackRate = rate
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
    height: 66%;
    color: white;
}
.board-middle>div{
  height: 430px;
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
.pauseAnime{
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
    /*position: relative;
    z-index: 10;*/
    width: 68%;
    height: 68%;
    margin: 16%;
    border-radius: 50%;
}
.disk-cover .backgroundImg{
    position: absolute;
    top: 0;
    z-index: -2;
    width: 68%;
    height: 68%;
    margin: 16%;
    border-radius: 50%;
}
.disk-cover .disk-border {
    position: absolute;
    top: 0px;
}
</style>
