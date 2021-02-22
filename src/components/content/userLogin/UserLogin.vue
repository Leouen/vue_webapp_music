<template>
  <div class="UserLogin">
    <div class="musicLogo wave_wrapper">
      <span class="wave_scale"></span>
      <span class="wave_scale delay"></span>
      <img src="~assets/img/icons/NetEase_music.svg" alt="" />
    </div>
    <div @click="phoneLogin" class="phoneLogin">
      <span>手机号登录</span>
    </div>
    <div class="startTry" @click="close">
      <span>立即体验</span>
    </div>
    <div class="loginIconList">
      <ul>
        <li><img src="~assets/img/login/weixin.svg" alt=""></li>
        <li><img src="~assets/img/login/qq.svg" alt=""></li>
        <li><img src="~assets/img/login/weibo.svg" alt=""></li>
        <li @click="mailLogin"><img src="~assets/img/login/yx.svg" alt=""></li>
      </ul>
    </div>
    <div class="protocol">
      <div class="protocolInput">
        <input type="checkbox" name="protocolbox" id="protocolbox">
        <label for="protocolbox"></label>
      </div>
      同意
      <span class="notice">《该网页仅供学习使用》</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {}
  },
  methods: {
    close () {
      this.$router.go(-1)
    },
    phoneLogin () {
      this.$router.push('/PhoneLogin')
    },
    mailLogin () {
      this.$router.push('/MailLogin')
    }
  }
}
</script>

<style scoped>
.UserLogin{
  background-color: #db2c1f;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9000;
  height: 100vh;
}
.musicLogo{
  position:absolute;
  top:43%;
  left:50%;
  transform:translate(-50%,-50%);
}
.phoneLogin{
  position:absolute;
  top:74%;
  left:50%;
  transform:translate(-50%,-50%);
  width: 275px;
  height: 34px;
  background: white;
  color: #ff3a3a;
  border: 1px white solid;
  border-radius: 26px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.startTry{
  position:absolute;
  top:81%;
  left:50%;
  transform:translate(-50%,-50%);
  width: 275px;
  height: 34px;
  background: #db2c1f;
  color: #fff;
  border: 1px #e66b62 solid;
  border-radius: 26px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginIconList{
  position:absolute;
  top:90%;
  left:50%;
  transform:translate(-50%,-50%);
  width: 245px;
  height: 34px;
}
.loginIconList>ul{
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginIconList>ul>li{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginIconList>ul>li>img{
  color: #f8d6d3;
  height: 30px;
  width: 30px;
  display: block;
  padding: 6px;
  border: 1px solid #e66b62;
  border-radius: 50%;
}
.protocol{
  position:absolute;
  top:96%;
  left:50%;
  transform:translate(-50%,-50%);
  width: 200px;
  height: 34px;
  font-size: 10px;
  color: #e97f78;
  display: flex;
  align-items: center;
  justify-content: center;
}
.protocolInput{
  position: relative;
}
.protocol input{
 height: 10px;
 width: 12px;
 visibility: hidden;
}
.protocol label{
  width: 10px;
  height: 10px;
  border: 1px solid #e97f78;
  position: absolute;
  left: 0px;
  top: 1px;
}
input:checked+label{
  background-image:url("~assets/img/icons/checkbox.svg")
}
.notice{
  color: #f4c0bc;
}
.musicLogo{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  width: 76px;
  border-radius: 50%;
  background: #f22a25;
  position: relative;
}
.musicLogo>img{
  height: 48px;
  width: 48px;
}
.musicLogo>span{
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(224,75,64);
  border-radius: 50%;
  z-index: -1;
}
span.wave_scale {
    animation: wave_scale 3s linear infinite;
    -webkit-animation: wave_scale 3s linear infinite;
}
@keyframes wave_scale {
    from {
        transform: translate3d(-41px, -41px, 0px) scale(1, 1);
        -webkit-transform: scale(1, 1);
        opacity: 1;
    }
    to {
        transform: translate3d(-41px, -41px, 0px) scale(7, 7);
        -webkit-transform: scale(3.5, 3.5);
        opacity: 0;
    }
}
span.wave_scale.delay {
    animation: wave_scale 3s linear infinite 1.4s;
    -webkit-animation: wave_scale 3s linear infinite 1.4s;
}

</style>
