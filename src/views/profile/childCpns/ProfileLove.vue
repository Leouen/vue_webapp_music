<template>
  <div class="ProfileLove">
    <div v-if="$store.state.user.isLogin!==false&&$store.state.user.userLikeList[0]" class="ProfileLoveBox">
      <div class="Loveleft">
        <div class="imgBoxLove">
          <img :src="$store.state.user.userLikeList[0].coverImgUrl"  alt="">
        </div>
      </div>
      <div class="Lovecenter">
          <div class="listName">我喜欢的歌</div>
          <div class="count">{{$store.state.user.userLikeList[0].trackCount}}首</div>
      </div>
      <div class="Loveright">
          <div class="LoverightBox">
            <img src="~assets/img/ProfileBox/xindong.svg" alt="" />
            <div>心动模式</div>
          </div>
      </div>
    </div>
    <div v-else class="ProfileLoveBox">
      <div class="Loveleft">
        <div class="imgBox">
          <img class="aixin" src="~assets/img/ProfileBox/aixin.svg"  alt="" />
        </div>
      </div>
      <div class="Lovecenter">
          <div class="listName">我喜欢的歌</div>
          <div class="count">0首</div>
      </div>
      <div class="Loveright">
          <div class="LoverightBox">
            <img src="~assets/img/ProfileBox/xindong.svg" alt="" />
            <div>心动模式</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileLove'
}
</script>

<style scoped>
.ProfileLoveBox{
  background: white;
  width: 90%;
  border-radius: 10px;
  margin: 18px auto 0px;
  display: flex;
}
.Loveleft{
  width: 70px;
}
.Loveleft .imgBox{
  width: 44px;
  height: 44px;
  border-radius: 8px;
  box-shadow: 0px -5px 0px -2px #f2f2f2;
  background: #9b9b9b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.Loveleft .imgBox>img{
  width: 20px;
  height: 20px;
}
.Lovecenter{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.Lovecenter .listName{
  font-size: 13px;
  color: black;
}
.Lovecenter .count{
  font-size: 10px;
  color: #a5a5a5;
}
.Loveright{
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.LoverightBox{
  display: flex;
  color: #333333;
  border: 1px #e6e6e6 solid;
  border-radius: 12px;
  padding: 2px 6px 1px 2px;
}
.LoverightBox>img{
  height: 14px;
  width: 14px;
  margin: 0px 2px;
}
.LoverightBox>div{
  font-size: 10px;
  height: 14px;
  line-height: 14px;
}
.imgBoxLove{
  width: 44px;
  height: 44px;
  border-radius: 8px;
  box-shadow: 0px -5px 0px -2px #f2f2f2;
  background: #9b9b9b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  overflow: hidden;
}
.imgBoxLove>img{
  width: 44px;
}
</style>>
