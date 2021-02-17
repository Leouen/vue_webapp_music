<template>
  <div class="ProfileBox">
    <ul class="ProfileBoxItem">
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/download.svg"/>
          <span>本地/下载</span>
        </a>
      </li>
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/yun.svg"/>
          <span>云盘</span>
        </a>
      </li>
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/chenggong.svg"/>
          <span>已购</span>
        </a>
      </li>
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/bofang.svg"/>
          <span>最近播放</span>
        </a>
      </li>
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/friends.svg"/>
          <span>我的好友</span>
        </a>
      </li>
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/shoucang.svg"/>
          <span>收藏和赞</span>
        </a>
      </li>
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/diantai.svg"/>
          <span>我的播客</span>
        </a>
      </li>
      <li>
        <a href="">
          <img class="ProfileBoxIcon" src="~assets/img/ProfileBox/more.svg"/>
          <span>音乐应用</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProfileBox'
}
</script>

<style>
.ProfileBox{
  background: white;
  width: 90%;
  border-radius: 10px;
  margin: 10px auto;
}
.ProfileBoxItem{
  display: flex;
  flex-wrap: wrap;
    padding-bottom: 10px;
}
.ProfileBoxItem li {
  flex: 25%;
  margin: 10px 0px;
}
.ProfileBoxItem a{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ProfileBoxIcon {
  width: 28px;
  height: 28px;
  margin: 6px;
}
.ProfileBoxItem span{
  font-size: 12px;
}
</style>
