<template>
  <div id="MusicPlayer">
    <img class="playerBg" @load="showBg" :src="$store.state.playlist.current.picUrl" alt="">
    <div>
      <div class="playerTop">
        <div class="playerLeft"  @click="isShowPlayer()"><span class="iconfont icon-xjt"></span></div>
        <div class="MusicPlayerNav">
          <div class="songNameBar">
            <span>{{$store.state.playlist.current.songName}}</span>
            <span class="songNameAlia"></span>
          </div>
          <div class="songAuthorBar">
            <span v-for="(item, index) in $store.state.playlist.current.author" :key="index">{{ item.name }}</span>
          </div>
        </div>
        <div class="playerRight"><span class="iconfont icon-fenxiang1"></span></div>
      </div>
      <music-player-board @click.native="showLyric" :class="{invisible:!isShowLyric}"></music-player-board>
      <music-player-disk-bar :class="{invisible:!isShowLyric}"></music-player-disk-bar>
      <div class='volume' :class="{invisible:isShowLyric}">
        <van-slider v-model="volume" @input="onChange(volume)" :step="5"/>
      </div>
      <music-player-lyric @click.native="showLyric" :class="{invisible:isShowLyric}" class="playerLyric"></music-player-lyric>
      <music-player-footer></music-player-footer>
    </div>
  </div>
</template>

<script>
import MusicPlayerBoard from './MusicPlayerBoard.vue'
import MusicPlayerDiskBar from './MusicPlayerDiskBar.vue'
import MusicPlayerFooter from './MusicPlayerFooter.vue'
import MusicPlayerLyric from './MusicPlayerLyric.vue'
export default {
  components: { MusicPlayerBoard, MusicPlayerFooter, MusicPlayerLyric, MusicPlayerDiskBar },
  data () {
    return {
      volume: 30,
      isShowLyric: true,
      showPlayerBg: false
    }
  },
  name: 'MusicPlayer',
  methods: {
    isShowPlayer () {
      this.$store.commit('isShowPlayer')
    },
    showBg () {
      let img = document.querySelector('.playerBg')
      if (img.complete === true) {
        this.showPlayerBg = true
        img.classList.add('fadeIn')
      } else {
        this.showPlayerBg = false
        console.log('图片还么加载好')
      }
    },
    // 歌词模块
    showLyric () {
      this.isShowLyric = !this.isShowLyric
    },
    onChange (volume) {
      this.$store.state.playlist.currentVolume = volume / 100
      this.$store.state.playlist.audioDom.volume = volume / 100
    }
  }
}
</script>

<style>
/* 背景虚化  */
#MusicPlayer{
  position: relative;
  overflow: hidden;
}
#MusicPlayer>img{
  position: absolute;
  top: 0;
  filter: blur(10px);
  transform: scale(3);
}
.fadeIn{
  animation: fadeIn 0.4s linear;
}
#MusicPlayer>div{
  background: url('~assets/img/playmusic/bgcover.png');
  height: 100%;
  position: relative;
  z-index: 3;
}
/* 整体布局  */
#MusicPlayer{
  height: 100%;
  background: #B1ADAC;
}
#MusicPlayer .iconfont{
  color: #fff;
  font-size: 22px;
}
#MusicPlayer .icon-xjt,#MusicPlayer .icon-fenxiang1{
  padding-bottom: 16px;
}
/** 播放器顶部 **/
.playerTop{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
.playerTop>.MusicPlayerNav{
  padding: 6px 24px 0px;
  flex: 1;
}
.playerLeft{
  padding-left: 20px;
}
.playerRight{
  padding-right: 20px;
}
.MusicPlayerNav{
  width: 270px;
  margin: 0 auto;
}
.songNameBar{
  color: #fff;
  text-align: center;
  margin-bottom: -3px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songAuthorBar{
  padding-top: 6px;
  color: rgba(255, 255, 255, 0.658);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@keyframes fadeIn {

}
.playerLyric{
  position: absolute;
  width: 375px;
  height: 450px;
  top: 100px;
  overflow: hidden;
}
.volume{
    position: absolute;
    top: 72px;
    left: 47.5px;
    width: 280px;
}
.volume .van-slider__button{
  height: 12px;
  width: 12px;
}
/** 未加载的颜色 */
.volume .van-slider{
  background: #adadad;
}
/** 加载的颜色 */
.volume .van-slider__bar{
  background: #FFF;
}
.volume .van-slider__bar{
  transition: none;
}
</style>
