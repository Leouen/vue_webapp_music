<template>
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
    <tab-bar-item path="/karaoke">
      <div slot="item-icon" class="iconfont icon-maikefeng"></div>
      <div slot="item-text">K歌</div>
    </tab-bar-item>
    <tab-bar-item path="/friends">
      <div slot="item-icon" class="iconfont icon-haoyou"></div>
      <div slot="item-text">云村</div>
    </tab-bar-item>
  </tab-bar>
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

</style>
