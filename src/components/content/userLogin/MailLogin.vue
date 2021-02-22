<template>
  <div class="MailLogin">
    <navbar class="loginNavbar">
      <div @click="close" class="loginLeftIcon" slot="left">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="loginTitle" slot="center">网易邮箱账号登陆</div>
    </navbar>
    <div class="mailLoginInput">
      <div class="loginInput">
        <input v-model="inputEmail" type="text" placeholder="请输入邮箱账号" />
        <span class="iconfont icon-guanbi" @click="clear()" v-show="inputEmail"></span>
        <div class="hintBox">
          <div @click="setInput(mail)" class="hintItem"  v-for="mail in emails" :key="mail">{{mail}}</div>
        </div>
      </div>
    </div>
    <div class="mailLoginInput">
      <div class="loginInput">
        <input v-model="password" type="password" placeholder="请输入密码" />
        <span class="recall_pw">忘记密码？</span>
      </div>
    </div>
    <div>
      <van-button class="btn" color="#ff3a3a" type="primary" block @click="login" >登陆</van-button>
    </div>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import { mailLogin, loginState } from 'network/login'
export default {
  name: 'MailLogin',
  data () {
    return {
      inputEmail: '', // 手机号
      password: '' // 密码
    }
  },
  components: {
    navbar
  },
  methods: {
    clear () {
      this.inputEmail = ''
    },
    close () {
      this.$router.go(-1)
    },
    // 点击该邮箱后缀是补全文本框
    setInput (mail) {
      this.inputEmail = mail
    },
    login () {
      // eslint-disable-next-line no-useless-escape
      var reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
      if (this.inputEmail === '') {
        this.$toast({ message: '请输入邮箱账号', className: 'toastIndex', position: 'bottom' })
      } else if (this.password === '') {
        this.$toast({ message: '请输入密码', className: 'toastIndex', position: 'bottom' })
      } else if (reg.test(this.inputEmail)) {
        // 进行网络请求
        mailLogin(this.inputEmail, this.password).then(
          (res) => {
            console.log(res)
            if (res.code === 200) {
              // 登陆成功 ，开始获得用户数据
              this.$toast({ message: '欢迎使用本网页~', className: 'toastIndex', position: 'bottom' })
            } else {
              this.$toast({ message: '亲~ 用户名或密码错误哦', className: 'toastIndex', position: 'bottom' })
            }
          }
        )
      } else {
        this.$toast({ message: '用户名或密码错误', className: 'toastIndex', position: 'bottom' })
      }
    }
  },
  computed: {
    emails () {
      // 如果inputEmail中没有任何东西，则不处理
      if (!this.inputEmail) return []
      // 考虑到用户自己要输@符号，如果@符号首次出现的位置大于等于第零个位置时，则不处理
      if (this.inputEmail.indexOf('@') > -1) return []
      return [
        this.inputEmail + '@163.com',
        this.inputEmail + '@126.com',
        this.inputEmail + '@qq.com',
        this.inputEmail + '@yahoo.com',
        this.inputEmail + '@gmail.com',
        this.inputEmail + '@msn.com',
        this.inputEmail + '@hotmail.com',
        this.inputEmail + '@aol.com',
        this.inputEmail + '@ask.com',
        this.inputEmail + '@live.com',
        this.inputEmail + '@yeah.net'
      ]
    }
  }
}
</script>
<style scoped>
.MailLogin{
  position: absolute;
  overflow: hidden;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9101;
  height: 100vh;
}
.MailLogin>.loginNavbar{
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

.mailLoginInput{
  width: 92%;
  margin: 30px auto -10px;
  display: flex;
  align-items: flex-end;
  height: 50px;
  border-bottom: 1px solid #cdcdcd;
}
.loginInput{
  position: relative;
}
.recall_pw{
  position: absolute;
  font-size: 12px;
  color: #5682b2;
  white-space: nowrap;
  right: -40px;
  bottom: 12px;
}
.loginInput input {
  height: 38px;
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
  margin: 45px auto 0px;
  border-radius: 44px;
  font-size: 16px;
}
.icon-below-s{
  font-size: 10px;
}

  .hintBox {
    width: 345px;
    position: absolute;
    box-shadow: 0px 0px 30px 5px #e6e6e6;
    z-index: 999;
    background-color: #fff;
  }
  .hintItem {
    cursor:pointer;
    margin-left: 6px;
    font-size: 14px;
    color: #333;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e6e6e6;
  }
  .loginInput .icon-guanbi{
    margin-left: 20px;
    color: #e6e6e6;
  }
</style>
