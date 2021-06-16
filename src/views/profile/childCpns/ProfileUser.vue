<template>
  <router-link class="ProfileLoginCpn" to="/UserLogin">
    <div class="ProfileLogin">
      <div class="UserImgNav">
        <img class="UserImgBig" :src="$store.state.user.profile.avatarUrl" alt="">
      </div>
      <div class="userInfo">
        <div class="userName">{{$store.state.user.profile.nickname}}</div>
        <div class="userLevel"><span>Lv.{{$store.state.user.profile.level}}</span></div>
      </div>
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
  position: relative;
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
.ProfileLogin>.icon-daohangyou{
  position: absolute;
  right: 26px;
  top: 12px;
  color: black;
  font-size: 18px;
}
.UserImgNav>.UserImgBig{
  height: 44px;
  width: 44px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.userInfo{
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 12px;
}
.userInfo .userName{
  font-size: 17px;
  color: black;
  font-weight: 600;
  padding-bottom: 3px;
}
.userInfo .userLevel{
  font-size: 10px;
  background: #fff;
  border-radius: 10px;
  width: 36px;
  padding: 1px 6px;
}
</style>>
