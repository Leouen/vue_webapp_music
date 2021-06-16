<template>
  <div class="PhoneLogin">
    <navbar class="loginNavbar">
      <div @click="close" class="loginLeftIcon" slot="left">
        <span class="iconfont icon-guanbi"></span>
      </div>
      <div class="loginTitle" slot="center">手机号登陆</div>
    </navbar>
    <div class="text_1">登陆后体验更多精彩</div>
    <div class="text_2">未注册手机登陆后将自动创建账号</div>
    <div class="loginBoxInput">
      <div class="countryDel">+86<span class="iconfont icon-below-s"></span></div>
      <div class="loginInput">
        <input v-model="tel" type="number" placeholder="请输入手机号" />
      </div>
    </div>
    <div>
      <van-button class="btn" color="#ff3a3a" type="primary" block @click="login" >下一步</van-button>
    </div>
    <div class="switchLogin">
      <div @click="toPassword">手机密码登陆</div>
      <div>邮箱密码登陆</div>
    </div>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
export default {
  name: 'PhoneLogin',
  data () {
    return {
      tel: '', // 手机号
      password: '' // 密码
    }
  },
  components: {
    navbar
  },
  methods: {
    close () {
      this.$router.go(-1)
    },
    toPassword () {
      this.$router.push('/PasswordLogin')
    },
    // 登陆
    login () {
      var reg = /^1[3-8][0-9]{9}$/ // 判断是否合法手机号
      if (reg.test(this.tel)) {
        this.$store.commit('user/SET_TEL', this.tel)
        this.$router.push('/PhoneLoginVerify')
      } else if (this.tel === '') {
        this.$toast({ message: '请输入手机号', className: 'toastIndex', position: 'bottom' })
      } else {
        this.$toast({ message: '请输入11位数字的手机号', className: 'toastIndex', position: 'bottom' })
      }
    }
  }
}
</script>
<style>
.PhoneLogin{
  position: absolute;
  overflow: hidden;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9001;
  height: 100vh;
}
.PhoneLogin>.loginNavbar{
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
.text_2{
  margin-top: 10px;
  font-size: 12px;
  padding-left: 20px;
}
.loginBoxInput{
  width: 92%;
  margin: 30px auto 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding-bottom: 8px;
  border-bottom: 1px solid #cdcdcd;
}
.countryDel{
  font-size: 14px;
  color: #333;
  padding-bottom: 1px;
}
.countryDel>span{
  padding-right: 10px;
}
.loginInput input {
  height: 34px;
  width: 300px;
  border: 0;
  color: black;
  font-size: 14px;
}
input::-webkit-input-placeholder{
    color:#d7d7d7;
}
.btn {
  width: 90%;
  margin: 30px auto 0px;
  border-radius: 44px;
  font-size: 16px;
}
.icon-below-s{
  font-size: 10px;
}
.switchLogin{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 80px;
  font-size: 14px;
  color: #5682b2;
}
.switchLogin>div{
  flex: 1;
  text-align: center;
}
.switchLogin :nth-child(1){
  border-right: #adadad 1px solid;
}
</style>
