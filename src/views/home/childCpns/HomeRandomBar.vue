<template>
  <div class="HomeRandomBar">
    <a href=""><div class="left l-title"><div class="title-sp">私人定制</div><span class="iconfont icon-shuaxin"></span> 网易精选 新歌速递</div></a>
    <div class="right r-title">
      <div class="r-title-word"><a class=""><span class="iconfont icon-bofang" ></span><span> 播放</span></a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRandomBar'
}
</script>

<style>
.HomeRandomBar{
  height: 40px;
  margin: 16px 0 0px;
}
.HomeRandomBar .r-title-word{
  margin-top: 5px;
}
.HomeRandomBar .r-title-word .icon-bofang{
  font-size: 12px;
  padding-right: 2px;
  padding-top: 0.5px;
  vertical-align: middle;
}
.HomeRandomBar .l-title>.icon-shuaxin{
  font-size: 18px;
}
.HomeRandomBar .l-title{
  position: relative;
}
.HomeRandomBar .title-sp{
  position: absolute;
  top: -12px;
  left: 0;
  font-size: 12px;
  color: #b3b3b3;
  font-weight: normal;
  height: 12px;
  line-height: 12px;
}
</style>
