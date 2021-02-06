<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
    <HomeSwiper></HomeSwiper>
    <HomeSlideBall></HomeSlideBall>
  </div>
</template>

<script>
import HomeNavBar from '@/components/content/homeNavBar/HomeNavBar'
import HomeSwiper from '@/views/home/childCpns/HomeSwiper'
import HomeSlideBall from '@/views/home/childCpns/HomeSlideBall'
export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeSlideBall
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
