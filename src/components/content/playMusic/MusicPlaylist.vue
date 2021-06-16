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
              <span v-if="item.id===$store.state.playlist.current.id" class="iconfont icon-playing"></span>
              <span :class="{colorRed: item.id===$store.state.playlist.current.id}" class="songNameStyle">{{item.songName}}</span>
              <span :class="{colorRed: item.id===$store.state.playlist.current.id}" class="songNameAlia songNameStyle" v-if="item.alia.length !== 0">({{ item.alia[0] }})</span>
              <span :class="{colorRed: item.id===$store.state.playlist.current.id}" class="singer"><span  v-for="(item, index) in item.author" :key="index" >- {{ item.name }}</span></span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <div class="right-icon" @click="remove(index,$event)">
            <span span class="item-dot iconfont icon-guanbi"></span>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'musicPlaylist',
  methods: {
    startPlay (current, songList, index) {
      this.$store.commit('isPlayed') // 播放过音乐 mini播放器 常驻显示
      this.$store.dispatch('playlist/selectPlaylist', { current, songList, index })
    },
    switchToRandom () {
      this.$store.commit('playlist/setMode', 2)
    },
    switchToOneloop () {
      this.$store.commit('playlist/setMode', 3)
    },
    switchToLoop () {
      this.$store.commit('playlist/setMode', 1)
    },
    remove (index, event) {
      this.$store.commit('playlist/removeListItem', index)
      event.stopPropagation()
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
.songName{
  width: 288px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songNameStyle{
  font-size: 13px;
}
.music-playlist .van-cell{
  padding-top: 5px;
  padding-bottom: 5px;
}
.music-playlist .icon-playing{
  color: #ff3a3a;
  padding-right: 6px;
}
</style>
