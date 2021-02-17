<template>
  <div class="ProfileLoginCpn">
    <div class="ProfileLogin">
      <span class="iconfont icon-tx"></span>
      <span class="PopupNavText">立即登陆</span>
      <span class="iconfont icon-daohangyou"></span>
    </div>
  </div>
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
}
.ProfileLogin>.icon-daohangyou{
  font-size: 18px;
}
</style>>
