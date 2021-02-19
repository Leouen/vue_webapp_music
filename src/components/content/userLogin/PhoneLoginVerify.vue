<template>
  <div class="PhoneLoginVerify">
    <navbar class="loginNavbar">
      <div @click="close" class="loginLeftIcon" slot="left">
        <span class="iconfont icon-guanbi"></span>
      </div>
      <div class="loginTitle" slot="center">手机号登陆</div>
    </navbar>
    <div class="text_1">请输入验证码</div>
    <div class="text_3">
      <span class="text_3_1">已发送至+86
        <span class="iconfont icon-xiezi"></span>
        <span v-show="show" @click="getCode" class="codeCount reGet">重新获取</span>
        <span v-show="!show" class="codeCount">{{count}} s</span>
      </span>
    </div>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
export default {
  name: 'PhoneLoginVerify',
  data () {
    return {
      show: true,
      timer: null,
      count: '',
      tel: '', // 手机号
      password: '' // 密码
    }
  },
  components: {
    navbar
  },
  methods: {
    close () {
      this.$router.go(-3)
    },
    getCode () {
      const TIME_COUNT = 6
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style>
.PhoneLoginVerify{
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9002;
  height: 100vh;
}
.PhoneLoginVerify>.loginNavbar{
  background: #fff;
  margin-top: 6px;
}
.loginLeftIcon{
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-fanhui{
  color: #333;
}
.loginTitle{
  font-size: 16px;
  color: #333;
  display: flex;
  text-align: start;
}
.text_1{
  font-size: 16px;
  color: #333;
  padding-left: 20px;
  margin-top: 30px;
}
.text_3{
  margin-top: 10px;
  font-size: 12px;
  padding-left: 20px;
}
.text_3_1{
  display: flex;
  align-items: center;
  position: relative;
}
.text_3_1 .codeCount{
  position: absolute;
  right: 20px;
  bottom: 0px;
  font-size: 13px;
}
.text_3_1 .reGet{
  font-size: 14px;
  color: #5682b2;
}
</style>
