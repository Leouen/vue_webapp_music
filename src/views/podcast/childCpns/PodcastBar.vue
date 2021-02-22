<template>
  <div class="PodcastBar">
    <navbar class="PodcastBarNav">
      <div slot="left" class="iconfont icon-caidan" @click="MenuPopup"></div>
      <div class="PodcastBarCenter"></div>
      <div slot="right" class="iconfont icon-sousuo1" ></div>
    </navbar>
    <van-tabs v-model="active" animated>
      <van-tab title="听听" title-style='z-index: 9;'>该页面还在开发中</van-tab>
      <van-tab title="推荐" title-style='z-index: 9;'>
        <podcast-rec></podcast-rec>
        <title-bar :titles='titles[0]' :showFront='true'></title-bar>
      </van-tab>
      <van-tab title="分类" title-style='z-index: 9;'>内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navbar from '../../../components/common/navbar/navbar.vue'
import TitleBar from '../../../components/common/titlebar/TitleBar.vue'
import PodcastRec from './PodcastRec.vue'
export default {
  name: 'PodcastBar',
  data () {
    return {
      active: 1,
      show: false,
      titles: [
        {
          left: '猜你在追',
          right: '我的播客',
          src: ''
        },
        {
          left: '播客合辑',
          right: '更多',
          src: ''
        },
        {
          left: '排行榜',
          right: '更多',
          src: ''
        }
      ]
    }
  },
  components: { Navbar, PodcastRec, TitleBar },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    }
  }
}
</script>

<style>
.PodcastBarNav div{
  font-size: 16px;
}

.PodcastBar .van-tabs__line{
  bottom: 25px;
}
.PodcastBarCenter{
  width: 5rem;
  margin: 0 auto;
}
.PodcastBar .van-tabs__wrap{
  width: 5rem;
  left: 50%;
  transform:translate(-50%,-50%);
  position: absolute;
  top: -0.5rem;

}
.PodcastBar .van-tabs__line{
  width: 40px;
}
</style>
