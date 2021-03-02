<template>
  <div id="PlayMusicMini">
    <div class="MiniContent">
      <div class="MiniLeft" @click="isShowPlayer">
        <img class="MiniCover" src="~assets/img/playmusic/play_disc.png"/>
      </div>
      <div class="MiniCenter" @click="isShowPlayer">
        <audio src="" autoplay></audio>
        正在播放音乐....
      </div>
      <div class="MiniRight">
        <circular-progress></circular-progress>
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
.MiniLeft{
  height: 40px;
  width: 40px;
  position: absolute;
  left: 12px;
  bottom: 4px;
}
.MiniLeft img{
  width: 40px;
}
.MiniCenter{
  flex: 1;
  padding-left: 75px;
  font-size: 12px;
}
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
</style>
