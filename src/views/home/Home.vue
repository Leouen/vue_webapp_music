<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
  </div>
</template>

<script>
import HomeNavBar from '@/components/content/homeNavBar/HomeNavBar'
import { getBanner } from 'network/home'
export default {
  name: 'Home',
  components: {
    HomeNavBar
  },
  data () {
    return {
      result: null
    }
  },
  created () {
    getBanner().then(res => {
      this.result = res
    })
  }
}
</script>

<style>

</style>
