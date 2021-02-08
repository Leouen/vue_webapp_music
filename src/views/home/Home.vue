<template>
  <div id="home">
    <home-nav-bar></home-nav-bar>
    <home-swiper></home-swiper>
    <home-slide-ball></home-slide-ball>
    <title-bar :titles='titles'></title-bar>
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
export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeSlideBall,
    TitleBar
  },
  data () {
    return {
      titles: {
        left: '精选歌单',
        right: '更多',
        src: ''
      }
    }
  }
}
</script>

<style>
</style>
