<template>
  <div id="app">
    <menu-popup></menu-popup>
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'
import MenuPopup from './views/menuPopup/MenuPopup.vue'
export default {
  name: 'app',
  components: {
    MainTabBar,
    MenuPopup
  }
}
</script>

<style>
  @import 'assets/css/base.css'
</style>
