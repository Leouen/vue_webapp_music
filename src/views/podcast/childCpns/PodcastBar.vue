<template>
  <div class="PodcastBar" >
    <div class="iconfont icon-caidan menu-icon" @click="MenuPopup"></div>
    <div class="iconfont icon-sousuo1 search-icon" @click='toSearch'></div>
    <van-tabs v-model="active" sticky>
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
  components: { PodcastRec, TitleBar, PodcastDjRecItem, PodcastDjRecSlider, PodcastDjHot, PodcastCategory, PodcastCategoryBody, PodcastDjBanner },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    },
    toSearch () {
      this.$router.push('/search')
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
.PodcastBar .van-tab__text{
  font-size: 18px;
}
.PodcastBar .van-tabs__wrap{
  height: 40px;
}
.PodcastBar .van-tab{
  line-height: 40px;
}
.PodcastBar .van-tabs__nav{
  width: 220px;
  background: #fff;
}
.PodcastBar .van-tabs__wrap{
  display: flex;
  justify-content: center;
  background: #fff;
}
.PodcastBar .van-tabs__line{
  bottom: 25px;
}
.PodcastBar .van-tabs__line{
  width: 36px;
}
.PodcastBar .van-tab--active{
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
