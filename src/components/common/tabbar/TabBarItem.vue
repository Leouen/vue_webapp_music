<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
    <div :style="activeIconStyle" class="tabbar-icon" :class="{active:isActive}"><slot name="item-icon"></slot></div>
    <div :style="activeStyle" class="tabbar-text"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#fd393a'
    },
    activeIcon: {
      type: String,
      default: '#ffffff'
    }
  },
  data () {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    },
    activeIconStyle () {
      return this.isActive ? { color: this.activeIcon } : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path).catch(err => err)// .catch(err => err)为捕获异常
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 52px;
    color: #bfbfbf;
  }

  .tab-bar-item .tabbar-icon {
    margin:4px auto;
    display:flex;
    width: 30px;
    height: 30px;
    justify-content:center;
    align-items:center;
    border-radius: 50%;
    background-color: white;
  }
  .tab-bar-item .tabbar-icon >div{
    font-size: 22px;
    margin-top: 2px;
    margin-bottom: 2px;
    line-height: 22px;
  }

  .tab-bar-item .tabbar-text {
    font-size: 9px;
    vertical-align: middle;
    margin-bottom: 3px;
  }
  .active {
    background:linear-gradient(45deg, red, #fdd5d5)  !important;
  }
</style>
