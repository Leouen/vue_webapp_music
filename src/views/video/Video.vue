<template>
  <div id="video">
    <div class="iconfont icon-caidan menu-icon" @click="MenuPopup"></div>
    <div class="iconfont icon-sousuo1 search-icon" @click='toSearch'></div>
    <van-tabs v-model="active" sticky>
      <van-tab title="推荐" title-style='z-index: 9;'>
        <video-rec></video-rec>
      </van-tab>
      <van-tab title="分类" title-style='z-index: 9;'>该页面还在开发中</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import VideoRec from './childCpns/VideoRec.vue'

export default {
  name: 'Karaoke',
  data () {
    return {
      show: true,
      active: 0
    }
  },
  components: {
    VideoRec
  },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    },
    toSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style>
#video .van-tab__text{
  font-size: 18px;
}
#video .van-tabs__wrap{
  height: 40px;
}
#video .van-tab{
  line-height: 40px;
}
#video .van-tabs__nav{
  width: 180px;
  background: #fff;
}
#video .van-tabs__wrap{
  display: flex;
  justify-content: center;
  background: #fff;
}
#video .van-tabs__line{
  bottom: 25px;
}
#video .van-tabs__line{
  width: 36px;
}
#video .van-tab--active{
  font-weight: bold;
}
.menu-icon.iconfont{
  position: fixed;
  top: 0;
  left: 0;
  font-size: 22px;
  width: 56px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #fff;
  z-index: 100;
  color: #333333;
}
.search-icon.iconfont{
  position: fixed;
  top: 0;
  right: 0;
  font-size: 18px;
  width: 56px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #fff;
  z-index: 100;
  color: #333333;
}
</style>
