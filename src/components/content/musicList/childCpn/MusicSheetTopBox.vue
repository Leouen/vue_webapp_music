<template>
<div class="bigBox" :style="[{backgroundImage:'url('+ (playlist.coverImgUrl) +')'}]">
  <div id="sheetTopBox">
    <div class="TopBoxLeft">
      <div class="SheetItemImg">
        <div class="ItemImg"><img alt="" :src="playlist.picUrl?playlist.picUrl:playlist.coverImgUrl"></div>
        <div class="ItemDiv"><span class="iconfont icon-bofang-tongyong"></span>{{playlist.playCount | toStringNum}}</div>
      </div>
    </div>
    <div class="TopBoxRight">
      <div class="TopBoxTitle">{{playlist.name}}</div>
      <div class="producer">
        <div class="producerImg">
          <img v-lazy="playlist.creator.avatarUrl" alt="">
          <div class="level" v-if="playlist.creator.avatarDetail" >
            <img :src="playlist.creator.avatarDetail.identityIconUrl" alt="">
          </div>
        </div>
        <div class="producerName"><span>{{playlist.creator.nickname}}</span></div>
        <span></span>
      </div>
      <div class="description">
        <a class="">
          <div class="descripText">{{playlist.description}}</div>
          <div class="iconfont icon-daohangyou"></div>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { toStringNum } from '@/common/utils'
export default {
  name: 'sheetTopBox',
  props: {
    playlist: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    toStringNum
  }
}
</script>

<style>
.bigBox{
  position: relative;
  overflow: hidden;
}
.bigBox:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* 从父元素继承 background 属性的设置 */
  background: inherit;
  filter: blur(10px);
  transform: scale(5);
  background-size: cover;
  z-index: 2;
}
.bigBox>div{
  position: relative;
  z-index: 3;
}
#sheetTopBox{
  height: 200px;
  display: flex;
  align-items: center;
  padding: 50px 8px 50px;
}
#sheetTopBox .TopBoxLeft{
  width: 108px;
  padding: 0px 6px;
  margin-top: 5px;
}
#sheetTopBox .SheetItemImg{
  width: 108px;
  text-align: center;
  position: relative;
}
#sheetTopBox .SheetItemImg>.ItemImg{
  width: 108px;
  height: 108px;
  border-radius: 14px;
  background: #f2f2f2;
}
#sheetTopBox .SheetItemImg>.ItemImg img{
  width: 100%;
  border-radius: 12px;
  box-shadow: 0px -10px 0px -5px rgba(163, 163, 177, 0.493);
}
#sheetTopBox .SheetItemImg>.ItemDiv{
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 10px;
  color: white;
  background-color: rgba(100, 100, 100, 0.4);
  padding: 1px 5px;
  border-radius: 10px;
  white-space:nowrap;
}
#sheetTopBox .SheetItemImg>.ItemDiv>span{
  font-size: 9px;
  padding-right: 2px;
}
.TopBoxRight {
  padding: 6px 0px 6px 20px;
}
.TopBoxRight .TopBoxTitle{
  margin: 4px 0px;
  font-size: 16px;
  height: 36px;
}
.producer{
  margin: 8px 0 4px;
  display: flex;
  align-items: center;
  width: 26px;
  height: 24px;
}
.producer>.producerImg{
  position: relative;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  border-radius: 50%;
  background: #fff;
}
.producer .producerImg>img{
  width: 24px;
  border-radius: 50%;

}
.producer .producerName{
  height: 24px;
  line-height: 24px;
  padding-left: 8px;
  font-size: 12px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.description{
  color: #fff;
  height: 16px;
  width: 200px;
  line-height: 16px;
  display: inline-table;
}
.description a {
    font-size: 12px;
    display: inline-table;
    display: table-cell;
    padding: 2px 6px 1px 0px;
    position: relative;
}
.descripText{
  color: #fff;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon-daohangyou{
  color: #fff;
  font-size: 12px;
  position: absolute;
  right: 70px;
  bottom: 1.5px;
}
.level{
  position: absolute;
  bottom: -7px;
  right: -2px;
}
.level img{
  width: 10px;
}
</style>
