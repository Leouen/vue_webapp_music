<template>
  <div id="home">
    <van-sticky>
       <home-nav-bar></home-nav-bar>
    </van-sticky>
    <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
      <home-swiper></home-swiper>
      <home-slide-ball></home-slide-ball>
      <title-bar :titles='titles[0]'></title-bar>
      <home-sheet></home-sheet>
      <home-random-bar></home-random-bar>
      <hot-sheet></hot-sheet>
      <div class="home-title"><title-bar :titles='titles[1]'></title-bar></div>
      <homedjprogram></homedjprogram>
      <div class="home-title"><title-bar :titles='titles[2]'></title-bar></div>
      <hometoplist></hometoplist>
    </van-pull-refresh>
  </div>
</template>

<script>
import HomeNavBar from '@/views/home/childCpns/HomeNavBar'
import HomeSwiper from '@/views/home/childCpns/HomeSwiper'
import HomeSlideBall from '@/views/home/childCpns/HomeSlideBall'
import TitleBar from '@/components/common/titlebar/TitleBar'
import HomeSheet from './childCpns/HomeSheet.vue'
import HotSheet from './childCpns/HotSheet.vue'
import HomeRandomBar from './childCpns/HomeRandomBar.vue'
import Homedjprogram from './childCpns/Homedjprogram.vue'
import Hometoplist from './childCpns/Hometoplist.vue'
export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeSlideBall,
    TitleBar,
    HomeSheet,
    HotSheet,
    HomeRandomBar,
    Homedjprogram,
    Hometoplist
  },
  data () {
    return {
      count: 0,
      isLoading: false,
      titles: [
        {
          left: '精选歌单',
          right: '更多',
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
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}
</script>

<style>
#home{
  min-height: 100vh;
}
.home-title{
  margin-top: 10px;
}
</style>
