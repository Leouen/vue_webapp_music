<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
    <HomeSwiper></HomeSwiper>
  </div>
</template>

<script>
import HomeNavBar from '@/components/content/homeNavBar/HomeNavBar'
import HomeSwiper from '@/views/home/childCpns/HomeSwiper'
export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
