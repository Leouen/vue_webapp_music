<template>
  <div id="MusicPlayer" :style="[{backgroundImage:'url('+ ($store.state.playlist.current.picUrl) +')'}]">
    <div>
      <van-cell title="">
        <template #icon>
          <span class="iconfont icon-xjt" @click="isShowPlayer()"></span>
        </template>
        <template #title>
          <div class="MusicPlayerNav">
            <div class="songNameBar">
              <span>{{$store.state.playlist.current.songName}}</span>
              <span class="songNameAlia"></span>
            </div>
            <div class="songAuthorBar">
              <span v-for="(item, index) in $store.state.playlist.current.author" :key="index">{{ item.name }}</span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <span class="iconfont icon-fenxiang1"></span>
        </template>
      </van-cell>
      <music-player-board></music-player-board>
      <music-player-footer></music-player-footer>
    </div>
  </div>
</template>

<script>
import MusicPlayerBoard from './MusicPlayerBoard.vue'
import MusicPlayerFooter from './MusicPlayerFooter.vue'
export default {
  components: { MusicPlayerBoard, MusicPlayerFooter },
  data () {
    return {
    }
  },
  name: 'MusicPlayer',
  methods: {
    isShowPlayer () {
      this.$store.commit('isShowPlayer')
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
#MusicPlayer:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* 从父元素继承 background 属性的设置 */
  background: inherit;
  filter: blur(10px);
  transform: scale(4);
  background-size: cover;
  z-index: 2;
}
#MusicPlayer>div{
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
  color: rgba(255, 255, 255);
  font-size: 22px;
}
#MusicPlayer .icon-xjt,#MusicPlayer .icon-fenxiang1{
  padding-bottom: 16px;
}
#MusicPlayer .van-cell{
  background: #adadad00;
}
#MusicPlayer .van-cell::after{
  border-bottom: 0px;
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
  color: rgba(255, 255, 255, 0.658);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
