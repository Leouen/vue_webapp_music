<template>
  <div id="app">
    <menu-popup></menu-popup>
    <transition :name="transitionName">
      <keep-alive exclude="MusicSheet">
        <router-view/>
      </keep-alive>
    </transition>
    <main-tab-bar v-if="isShowBar()" ></main-tab-bar>
    <play-music-mini :class="setBottom()"></play-music-mini>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'
import MenuPopup from './views/menuPopup/MenuPopup.vue'
import PlayMusicMini from './components/content/playMusic/PlayMusicMini.vue'
export default {
  data () {
    return {
      transitionName: null // 'slide-left' // 默认过渡动画
    }
  },
  name: 'app',
  components: {
    MainTabBar,
    PlayMusicMini,
    MenuPopup
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route (to, from) {
      // 实现路由跳转动画
      // if (to.meta.index > from.meta.index) { this.transitionName = 'slide-left' }
      // if (to.meta.index < from.meta.index) { this.transitionName = 'slide-right' }
    }
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
