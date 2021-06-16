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
      <span class="text_3_1">已发送至+86 {{numHidden(this.$store.state.user.tel)}}
        <span class="iconfont icon-xiezi"></span>
        <span v-show="show" @click="reGetCode" class="codeCount reGet">重新获取</span>
        <span v-show="!show" class="codeCount">{{count}} s</span>
      </span>
    </div>
    <van-password-input
      :length="4"
      :value="value"
      :gutter="10"
      :mask="false"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <div class="del_change">
      <span>手机号已停用</span>
      <span class="iconfont icon-daohangyou" ></span>
    </div>
    <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import { getCaptcha, getCode, loginState, getAccountInfo } from 'network/login'
export default {
  name: 'PhoneLoginVerify',
  data () {
    return {
      value: '',
      showKeyboard: true,
      show: true,
      timer: null,
      count: '',
      password: '' // 密码
    }
  },
  components: {
    navbar
  },
  mounted () {
    this.reGetCode()
  },
  methods: {
    close () {
      this.$router.go(-3)
    },
    numHidden (str) {
      return str.substr(0, 3) + '****' + str.substr(7)
    },
    reGetCode () {
      getCode(this.$store.state.user.tel).then(res => {
        console.log(res)
        this.$toast({ message: '验证码已发送，请查收', className: 'toastIndex', position: 'bottom' })
      })
      const TIME_COUNT = 60
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
  },
  watch: {
    value (value) {
      if (value.length === 4) {
        getCaptcha(this.$store.state.user.tel, value).then(res => {
          if (res.code === 200) {
            console.log(res)
            // 登陆成功 ，开始获得用户数据
            loginState().then(res => {
              console.log(res)
            })
            getAccountInfo().then(res => {
              console.log(res)
            })
            this.$toast({ message: '欢迎使用本网页~', className: 'toastIndex', position: 'bottom' })
          } else {
            this.$toast({ message: '验证码错误', className: 'toastIndex', position: 'bottom' })
            this.value = ''
          }
        }
        )
      } else {}
    }
  }
}
</script>

<style>
.van-password-input{
  width: 80%;
  margin: 0 auto;
}
.van-password-input__item{
  margin: 0px 10px;
  border-bottom: 1px solid #d7d7d7;
}
.van-password-input__item.blackBold{
  border-bottom: 1px solid black;
}
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
  margin-bottom: 10px;
  font-size: 12px;
  padding-left: 20px;
  color: #9d9d9d;
}
.text_3 .icon-xiezi{
  padding-left: 2px;
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
.del_change{
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #9d9d9d;
}
.del_change .icon-daohangyou{
  font-size: 10px;
}
</style>
