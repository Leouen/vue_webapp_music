<template>
  <div id="home">
    <home-nav-bar></home-nav-bar>
    <home-swiper></home-swiper>
    <home-slide-ball></home-slide-ball>
    <title-bar :titles='titles[0]'></title-bar>
    <home-sheet></home-sheet>
    <home-random-bar></home-random-bar>
    <hot-sheet></hot-sheet>
    <div class="home-title"><title-bar :titles='titles[1]'></title-bar></div>
    <homedjprogram></homedjprogram>
    <ul>
      <li v-for="item in 100" :key="item">li{{item}}</li>
    </ul>
  </div>
</template>

<script>
import HomeNavBar from '@/components/content/homeNavBar/HomeNavBar'
import HomeSwiper from '@/views/home/childCpns/HomeSwiper'
import HomeSlideBall from '@/views/home/childCpns/HomeSlideBall'
import TitleBar from '@/components/common/titlebar/TitleBar'
import HomeSheet from './childCpns/HomeSheet.vue'
import HotSheet from './childCpns/HotSheet.vue'
import HomeRandomBar from './childCpns/HomeRandomBar.vue'
import Homedjprogram from './childCpns/Homedjprogram.vue'
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
    Homedjprogram
  },
  data () {
    return {
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
        }
      ]
    }
  }
}
</script>

<style>
.home-title{
  margin-top: 10px;
}
</style>
