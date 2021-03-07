<template>
  <div id="diskBar">
    <div><span class="iconfont icon-aixin1"></span></div>
    <div><span class="iconfont icon-download"></span></div>
    <div>
      <span v-if="$store.state.playlist.modeRate===1" @click="swichModeRate(2,1.0)" class="iconfont icon-rate08 rate"></span>
      <span v-if="$store.state.playlist.modeRate===2" @click="swichModeRate(3,1.2)" class="iconfont icon-rate1 rate"></span>
      <span v-if="$store.state.playlist.modeRate===3" @click="swichModeRate(4,1.6)" class="iconfont icon-rate12 rate"></span>
      <span v-if="$store.state.playlist.modeRate===4" @click="swichModeRate(5,2.0)" class="iconfont icon-rate16 rate"></span>
      <span v-if="$store.state.playlist.modeRate===5" @click="swichModeRate(1,0.8)" class="iconfont icon-rate2 rate"></span>
    </div>
    <div><span class=" iconfont icon-liuyan " @click="showComment($store.state.playlist.current.id,0,$store.state.playlist.current)"></span></div>
    <div><span class="iconfont icon-ziyuan"></span></div>
  </div>
</template>

<script>
export default {
  name: 'diskBar',
  methods: {
    swichModeRate (number, rate) {
      this.$store.commit('playlist/swichModeRate', number)
      this.$store.state.playlist.audioDom.playbackRate = rate
    },
    showComment (id, type, info) {
      this.$store.commit('isShowComment')
      this.$store.commit('setCommentId', { id, type, info })
    }
  }
}
</script>

<style>
/** 唱片底部导航栏 */
#diskBar{
  width: 295px;
  position: absolute;
  bottom: 90px;
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
