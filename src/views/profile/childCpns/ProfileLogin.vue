<template>
  <router-link class="ProfileLoginCpn" to="/UserLogin">
    <div class="ProfileLogin">
      <div class="UserImgNav">
        <img class="UserImgBig" src="~assets/img/ProfileBox/user.svg" alt="">
      </div>
      <span class="PopupNavText">立即登陆</span>
      <span class="iconfont icon-daohangyou"></span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ProfileLogin'
}
</script>

<style scoped>
.ProfileLogin{
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-left: 20px;
}
.ProfileLogin>.icon-tx{
  font-size: 40px;
  margin-right: 10px;
}
.ProfileLogin>.PopupNavText{
  font-weight: bold;
  font-size: 18px;
  padding-left: 12px;
}
.ProfileLogin>.icon-daohangyou{
  font-size: 18px;
}
.UserImgNav>.UserImgBig{
  height: 44px;
  width: 44px;
  border-radius: 50%;
  border: 2px solid #fff;
}
</style>>
