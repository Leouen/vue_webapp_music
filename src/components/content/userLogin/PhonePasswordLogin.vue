<template>
  <div class="passwordLogin">
    <navbar class="loginNavbar">
      <div @click="close" class="loginLeftIcon" slot="left">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="loginTitle" slot="center">手机账号登陆</div>
    </navbar>
    <div class="passwordLoginInput">
      <div class="loginInput">
        <input v-model="tel" type="text" placeholder="请输入手机号" />
        <span class="iconfont icon-guanbi" @click="clear()" v-show="tel"></span>
      </div>
    </div>
    <div class="passwordLoginInput">
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
import { phoneLogin, loginState } from 'network/login'
import { getUserDetail, getUserPlayList } from 'network/user'
export default {
  name: 'passwordLogin',
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
    clear () {
      this.tel = ''
    },
    close () {
      this.$router.go(-1)
    },
    // 点击该邮箱后缀是补全文本框
    setInput (mail) {
      this.tel = mail
    },
    login () {
      // eslint-disable-next-line no-useless-escape
      var reg = /^1[3-8][0-9]{9}$/ // 判断是否合法手机号
      if (this.tel === '') {
        this.$toast({ message: '请输入手机账号', className: 'toastIndex', position: 'bottom' })
      } else if (this.password === '') {
        this.$toast({ message: '请输入密码', className: 'toastIndex', position: 'bottom' })
      } else if (reg.test(this.tel)) {
        // 进行网络请求
        phoneLogin(this.tel, this.password).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.$router.go(-3)
            // 设置用户个人简介 包括id名称，
            this.$store.commit('user/SET_LOGIN')
            this.$store.commit('user/SET_PROFLIE', res.profile)
            getUserDetail(this.$store.state.user.profile.userId).then((res) => {
              // console.log(res)
              this.$store.commit('user/set_level', res.level)
              this.$store.commit('user/set_listenSongs', res.listenSongs)
            })
            // 获取用户歌单
            getUserPlayList(this.$store.state.user.profile.userId).then((res) => {
              // console.log(res)
              for (const item of res.playlist) {
                // 喜欢的歌单
                if (item.specialType === 5) {
                  this.$store.state.user.userLikeList.push({
                    coverImgUrl: item.coverImgUrl,
                    name: item.name,
                    id: item.id,
                    playCount: item.playCount,
                    trackCount: item.trackCount,
                    creator: item.creator.nickname
                  })
                } else if (item.userId === this.$store.state.user.profile.userId) {
                  // 用户创建的歌单
                  this.$store.state.user.userCreateList.push({
                    coverImgUrl: item.coverImgUrl,
                    name: item.name,
                    id: item.id,
                    playCount: item.playCount,
                    trackCount: item.trackCount,
                    creator: item.creator.nickname
                  })
                } else {
                  // 用户收藏的歌单
                  this.$store.state.user.userSubList.push({
                    coverImgUrl: item.coverImgUrl,
                    name: item.name,
                    id: item.id,
                    playCount: item.playCount,
                    trackCount: item.trackCount,
                    creator: item.creator.nickname
                  })
                }
              }
            })
            console.log(this.$store.state.user.userLikeList)
            console.log(this.$store.state.user.userCreateList)
            console.log(this.$store.state.user.userSubList)
            console.log(this.$store.state.user.profile)
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
  }
}
</script>
<style scoped>
.passwordLogin{
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
.passwordLogin>.loginNavbar{
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

.passwordLoginInput{
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
