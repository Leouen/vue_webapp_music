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
        <podcast-dj-rec-slider></podcast-dj-rec-slider>
        <title-bar :titles='titles[1]'></title-bar>
        <podcast-dj-hot></podcast-dj-hot>
        <title-bar :titles='titles[2]'></title-bar>
        <podcast-dj-rec-item :list='list[1]'></podcast-dj-rec-item>
        <title-bar :titles='titles[3]'></title-bar>
        <podcast-dj-rec-item :list='list[0]'></podcast-dj-rec-item>
        <title-bar :titles='titles[4]'></title-bar>
        <podcast-dj-rec-item :list='list[2]'></podcast-dj-rec-item>
        <podcast-dj-banner></podcast-dj-banner>
      </van-tab>
      <van-tab title="分类" title-style='z-index: 9;'>
        <podcast-category></podcast-category>
        <podcast-category-body :list='list'></podcast-category-body>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navbar from '../../../components/common/navbar/navbar.vue'
import TitleBar from '../../../components/common/titlebar/TitleBar.vue'
import PodcastRec from './PodcastRec.vue'
import { getDjCateRec } from 'network/podcast'
import PodcastDjRecItem from './PodcastDjRecItem.vue'
import PodcastDjRecSlider from './PodcastDjRecSlider.vue'
import PodcastDjHot from './PodcastDjHot.vue'
import PodcastCategory from './PodcastCategory.vue'
import PodcastCategoryBody from './PodcastCategoryBody.vue'
import PodcastDjBanner from './PodcastDjBanner.vue'
export default {
  name: 'PodcastBar',
  data () {
    return {
      active: 1,
      list: [],
      show: false,
      titles: [
        {
          left: '猜你在追',
          right: '我的播客',
          src: ''
        },
        {
          left: '精选播单',
          right: '更多',
          src: ''
        },
        {
          left: '音乐故事 | 这有一个故事陪你听歌',
          right: '更多',
          src: ''
        },
        {
          left: '情感调频 | 治愈你的每一种情绪',
          right: '更多',
          src: ''
        },
        {
          left: '重磅呈现 | 不容错过的宝藏播客',
          right: '更多',
          src: ''
        }
      ]
    }
  },
  components: { Navbar, PodcastRec, TitleBar, PodcastDjRecItem, PodcastDjRecSlider, PodcastDjHot, PodcastCategory, PodcastCategoryBody, PodcastDjBanner },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    }
  },
  created () {
    getDjCateRec().then(res => {
      this.list = res.data
      // console.log(this.list)
    })
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
