<template>
  <div class="ProfileBar">
    <navbar>
      <div id="HomeNavLeft" slot="left" class="iconfont icon-caidan" @click="MenuPopup"></div>
      <div v-if="show"  slot="center" >
        <div class="ProfileLoginBar">
          <div class="UserImgNav">
            <img class="UserImg" src="~assets/img/ProfileBox/user.svg" alt="">
          </div>
          <span class="PopupNavText">立即登陆</span>
          <span class="iconfont icon-daohangyou"></span>
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from '../../../components/common/navbar/navbar.vue'
export default {
  name: 'ProfileBar',
  data () {
    return {
      show: false
    }
  },
  components: { navbar },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    }
  }
}
</script>

<style>
.ProfileLoginBar{
  display: flex;
  justify-content: center;
  align-items: center;
}
.UserImgNav{
  display: flex;
  justify-content: center;
  align-items: center;
}
.UserImgNav>img{
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #f1ecec;
}
</style>
