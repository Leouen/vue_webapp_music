<template>
  <div id="main-music-bar">
    <tab-bar>
      <tab-bar-item path="/home">
        <div slot="item-icon" class="iconfont icon-faxian"></div>
        <div slot="item-text">发现</div>
      </tab-bar-item>
      <tab-bar-item path="/podcast">
        <div slot="item-icon" class="iconfont icon-boke"></div>
        <div slot="item-text">播客</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <div slot="item-icon" class="iconfont icon-profile"></div>
        <div slot="item-text">我的</div>
      </tab-bar-item>
      <tab-bar-item path="/video">
        <div slot="item-icon" class="iconfont icon-shipin"></div>
        <div slot="item-text">视频</div>
      </tab-bar-item>
      <tab-bar-item path="/friends">
        <div slot="item-icon" class="iconfont icon-haoyou"></div>
        <div slot="item-text">云村</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
#main-music-bar{
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
