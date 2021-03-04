<template>
  <div class="music-playlist">
    <div class="playlistTitle">
      <div class="playAll">播放全部<span>({{$store.state.playlist.playlist.length}})</span></div>
      <div class="playAllBotoom">
        <div class="playAllLeft"  v-if="$store.state.playlist.mode===1" @click="switchToRandom" >
          <span class="iconfont icon-loop"></span>
          <span class="playAllRightText">循环播放</span>
        </div>
        <div class="playAllLeft"  v-if="$store.state.playlist.mode===2" @click="switchToOneloop" >
          <span class="iconfont icon-random"></span>
          <span class="playAllRightText">随机播放</span>
        </div>
        <div class="playAllLeft"  v-if="$store.state.playlist.mode===3" @click="switchToLoop" >
          <span class="iconfont icon-loop-one"></span>
          <span class="playAllRightText">单曲循环</span>
        </div>
        <div class="playAllRight">
          <span class="iconfont icon-tianjiagedan"></span>
          <span class="playAllRightText">收藏全部</span>
          <span class="iconfont icon-delete"></span>
        </div>
      </div>
    </div>
    <div class="playlistBody">
      <van-cell title="" v-for="(item,index) in $store.state.playlist.playlist" :key="index" @click="startPlay(item,$store.state.playlist.playlist,index)">
        <template #title>
          <div>
            <div class="songName">
              <span class="songNameStyle">{{item.songName}}</span>
              <span class="songNameAlia songNameStyle" v-if="item.alia.length !== 0">({{ item.alia[0] }})</span>
              <span class="singer" v-for="(item, index) in item.author" :key="index">- {{ item.name }}</span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <div class="right-icon">
            <span span class="item-dot iconfont icon-guanbi"></span>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { playSong, getlyric } from 'network/playmusic'
export default {
  name: 'musicPlaylist',
  methods: {
    startPlay (current, songList, index) {
      this.$store.commit('isPlayed') // 播放过音乐 mini播放器 常驻显示
      this.$store.commit('playlist/setPlaylist', songList) // 设置正在播放的歌单
      this.$store.commit('playlist/setplIndex', index) // 设置正在播放的下标
      // console.log(this.$store.state.playlist.playlist)
      playSong(current.id).then((res) => {
        // console.log(res)
        var musicUrl = res.data[0].url // 获得音乐url
        // 只要是提交，无论在哪里模块直接$store.commit
        this.$store.commit('playlist/setCurrentSrc', musicUrl)
        this.$store.commit('playlist/updateCurrent', current)
      })
      getlyric(current.id).then((res) => {
        if (res.lrc) {
          this.$store.commit('playlist/setCurrentLyric', res.lrc.lyric)
        }
      })
    },
    switchToRandom () {
      this.$store.commit('playlist/setMode', 2)
    },
    switchToOneloop () {
      this.$store.commit('playlist/setMode', 3)
    },
    switchToLoop () {
      this.$store.commit('playlist/setMode', 1)
    }
  }
}
</script>

<style>
.music-playlist{
  overflow: hidden;
}
.music-playlist .iconfont{
  color: #bcbcbc;
}
.playlistTitle{
  position: fixed;
  z-index: 20;
  background: white;
  height: 70px;
  width: 337px;
  border-radius: 20px;
  padding: 15px 16px;
}

/** 歌单标题 */
.playlistTitle>.playAll{
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.playAllBotoom{
  padding-top: 3px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  align-items: center;
}
.playAllBotoom>div{
  flex: 1;
}
.playAllBotoom .playAllRight{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.playAllBotoom .playAllLeft{
  padding-top: 2px;
  display: flex;
  align-items: center;
}
.playlistTitle .icon-delete{
  padding-left: 10px;
  border-left: 1px solid #d1d1d1;
}
.playAllRightText{
  padding-right: 10px;
  padding-left: 5px;
  font-size: 12px;
  color: black;
}
/** 歌单列表 */

.playlistBody{
  padding-top: 66px;
}
.singer{
  padding-left: 8px;
  font-size: 11px;
  color: #8d8d8d;
}
.songNameStyle{
  font-size: 13px;
}
.music-playlist .van-cell{
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
