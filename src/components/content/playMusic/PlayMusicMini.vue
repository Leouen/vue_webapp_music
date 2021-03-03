<template>
  <div id="PlayMusicMini">
    <div class="MiniContent">
      <div class="MiniLeft" @click="isShowPlayer">
        <div class="disk-cover-animation" :class="{animePause: !$store.state.playlist.playing}">
            <img class="left-disk-border" src="~assets/img/playmusic/play_disc.png"/>
            <img class="left-album" :src="$store.state.playlist.current.picUrl"/>
            <img class="left-album" style="display: none" src="~assets/img/playmusic/placeholder_disk_play_song.png"/>
        </div>
      </div>
      <div class="MiniCenter" @click="isShowPlayer">{{$store.state.playlist.current.songName}}
       -  <span v-for="(item, index) in $store.state.playlist.current.author" :key="index">{{ item.name }}</span>
      </div>
      <div class="MiniRight">
        <div class="minProgress"  @click="toPlay">
          <circular-progress></circular-progress>
          <span v-if="!$store.state.playlist.playing" class="toPlayMini iconfont icon-miniPlay"></span>
          <span v-if="$store.state.playlist.playing"  class="toPlayMini iconfont icon-miniPause"></span>
        </div>
        <span class="iconfont icon-songlist"></span>
      </div>
    </div>
    <van-popup v-model="$store.state.isShowPlayer" position="bottom" :style="{ height: '100%' }">
      <music-player></music-player>
    </van-popup>
  </div>
</template>

<script>
import CircularProgress from './CircularProgress.vue'
import MusicPlayer from './MusicPlayer.vue'
export default {
  name: 'PlayMusicMini',
  components: { CircularProgress, MusicPlayer },
  data () {
    return {
    }
  },
  methods: {
    isShowPlayer () {
      this.$store.commit('isShowPlayer')
    },
    toPlay () {
      this.$store.commit('playlist/setPlaying')
      this.$store.state.playlist.audioDom.paused === true ? this.$store.state.playlist.audioDom.play() : this.$store.state.playlist.audioDom.pause()
    }
  }
}
</script>

<style>
#PlayMusicMini{
  min-height: 40px;
  width: 100%;
  padding-bottom: 2px;
  z-index: 100;
  position: fixed;
  left: 0;
  background: white;
  box-shadow: 0px -0.3px 0.3px 0px #d1d1d1;
}
.MiniContent{
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
/** 左边布局 */
.MiniLeft{
  height: 40px;
  width: 40px;
  position: absolute;
  left: 12px;
  bottom: 4px;
}
.MiniLeft>div{
  width: 40px;
  height: 40px;
}
.left-disk-border{
  position: absolute;
  top: 0;
  width: 100%;
}
.left-album{
    width: 68%;
    margin: 16%;
    border-radius: 50%;
}
/** 中间布局 */
.MiniCenter{
  flex: 1;
  padding-left: 65px;
  padding-right: 20px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
/** 右边布局 */
.MiniRight{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
}
.MiniRight .progress>div{
  display: flex;
  justify-content: center;
  align-items: center;
}
.MiniRight .icon-songlist{
  width: 40px;
  font-size: 30px;
}
.minProgress{
  position: relative;
}
.iconfont.toPlayMini{
  position: absolute;
  font-size: 12px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/** 动画 */
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

@-webkit-keyframes rotate-disk {
    100% {
        -webkit-transform: rotateZ(360deg);
    }
}
</style>
