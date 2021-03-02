<template>
  <div id="MusicPlayer">
    <van-cell title="">
      <template #icon>
        <span class="iconfont icon-xjt" @click="isShowPlayer()"></span>
      </template>
      <template #title>
        <div>
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
#MusicPlayer{
  height: 100vh;
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
