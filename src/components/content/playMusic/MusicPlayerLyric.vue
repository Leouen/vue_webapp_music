<template>
  <div class="lyricList">
    <ul class="lyric" ref="lyric">
        <li class="topPadding"></li>
        <li :class="{each:true, choose: (index===lyricIndex)}" v-for="(item, key, index) in $store.state.playlist.current.lyric" :key="key">{{item}}</li>
        <li class="bottomPadding"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayerLyric',
  data () {
    return {
      lyricIndex: 0,
      value: this.$store.state.playlist.currentSec
    }
  },
  computed: {
    listenSec () {
      return this.$store.state.playlist.currentSec
    }
  },
  watch: {
    listenSec: function (old, newd) {
      // console.log(old)
      newd = parseInt(newd)
      // console.log(old)
      let i = 0
      // 循环歌词对象
      for (let key in this.$store.state.playlist.current.lyric) {
      // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度lyricIndex
        if (+key === newd) {
          this.lyricIndex = i
          // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
          this.$refs.lyric.scrollTo(0, 40 * i)
        }
        i++
      }
    }
  }
}
</script>

<style lang="less" scoped>
.topPadding{
  padding-top: 200px;
  height: 10px;
}
.bottomPadding{
  padding-bottom: 200px;
  height: 10px;
}
.lyric {
        scroll-behavior: smooth;
        width: 375px;
        height: 446px;
        position: absolute;
        // 滚动条
        overflow: auto;
        color: rgb(197, 197, 197);
        font-size: 10px;
        font-weight: normal;
        padding: 3px 10px;
        border-left: none;
        .each {
        height: 40px;
        // border: 1px solid #000;
        line-height: 40px;
        text-align: center;
        }
        .choose {
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-weight: bold;
        }
        // 修改滚动条样式
        &::-webkit-scrollbar {
            width: 1px;
            height: 1px;
        }
        // 滑块部分
        &::-webkit-scrollbar-thumb {
            background-color: #eee;
        }
        // 轨道部分
        &::-webkit-scrollbar-track {
            background-color: #333;
        }
    }
.lyric li{
  margin: 0 auto;
  overflow: hidden;
  width: 300px;
  white-space: pre-wrap;
  font-size: 14px;
  text-align: center;
}
</style>
