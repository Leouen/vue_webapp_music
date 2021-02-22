<template>
  <div class="PodcastBar">
    <navbar>
      <div slot="left" class="iconfont icon-caidan" @click="MenuPopup"></div>
      <div slot="center" class="PodcastBarCenter">
        <van-tabs v-model="active">
          <van-tab title="听听" title-style='z-index: 9;'>该页面还在开发中</van-tab>
          <van-tab title="推荐" title-style='z-index: 9;'><podcast-rec></podcast-rec></van-tab>
          <van-tab title="分类" title-style='z-index: 9;'>内容 3</van-tab>
        </van-tabs>
      </div>
      <div slot="right" class="iconfont icon-sousuo1" ></div>
    </navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../../../components/common/navbar/navbar.vue'
import PodcastRec from './PodcastRec.vue'
export default {
  name: 'PodcastBar',
  data () {
    return {
      active: 1,
      show: false
    }
  },
  components: { Navbar, PodcastRec },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    }
  }
}
</script>

<style>
.PodcastBar .van-tabs__line{
  bottom: 25px;
}
.PodcastBarCenter{
  width: 160px;
  margin: 0 auto;
}
.PodcastBar .van-tabs__line{
  width: 40px;
}
</style>
