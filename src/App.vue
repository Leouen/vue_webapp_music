<template>
  <div id="app">
    <menu-popup></menu-popup>
    <router-view></router-view>
    <main-tab-bar v-if="isShowBar()" ></main-tab-bar>
    <play-music-mini :class="setBottom()"></play-music-mini>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'
import MenuPopup from './views/menuPopup/MenuPopup.vue'
import PlayMusicMini from './components/content/playMusic/PlayMusicMini.vue'
export default {
  name: 'app',
  components: {
    MainTabBar,
    PlayMusicMini,
    MenuPopup
  },
  methods: {
    isShowBar () {
      return this.$route.path === '/home' || this.$route.path === '/karaoke' || this.$route.path === '/friends' || this.$route.path === '/profile' || this.$route.path === '/podcast'
    },
    setBottom () {
      return [
        this.$route.path === '/home' ||
        this.$route.path === '/karaoke' ||
        this.$route.path === '/profile' ||
        this.$route.path === '/podcast' ||
        this.$route.path === '/friends'
          ? 'bottom51'
          : 'bottom0'
      ]
    }
  }
}
</script>

<style>
  @import 'assets/css/base.css'
</style>
