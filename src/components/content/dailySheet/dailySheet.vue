<template>
<div>
  <van-sticky>
    <div class="MusicSheetNavBar">
      <div class="NavBarBefore" :style="[{ backgroundImage: 'url(' + playlist.coverImgUrl + ')' }]"></div>
      <navbar>
        <div slot="left" class="iconfont icon-fanhui" @click="back"></div>
        <div class="SheetCenter" slot="center">
          歌单<span class="iconfont icon-shangbiao"></span>
        </div>
        <div slot="right" class="SheetRight">
          <span class="iconfont icon-sousuo1"></span>
          <span class="iconfont icon-ziyuan"></span>
        </div>
      </navbar>
    </div>
  </van-sticky>
  
</div>
</template>

<script>
import MusicSheetBottom from "../musicList/childCpn/MusicSheetBottom.vue";
import {
  getDailySong
} from "network/musicList";
export default {
  components: {
    MusicSheetBottom
  },
  data() {
    return {
      songList: [],
      songCount: 0,
      privileges: []
    };
  },
  methods: {
    getSheet() {
      getDailySheet().then(res => {
        console.log(res);
        this.songList = res.recommend;
        this.songCount = 20;
      });
    }
  },
  created() {
    this.getSheet();
  }
};
</script>

<style scoped>

/* 导航 */
.MusicSheetNavBar{
  position: fixed;
  width: 375px;
  z-index: 4;
  overflow: hidden;
}
.NavBarBefore{
  content: "";
  width: 420px;
  height: 60px;
  position: absolute;
  overflow: hidden;
  opacity: 0;
  filter: blur(6px);
  transform: scale(1.2);
  z-index: 3;
}
.MusicSheetNavBar .nav-bar{
  /* 从父元素继承 background 属性的设置 */
  background: inherit;
  position: relative;
  z-index: 4;
}
.sheetTripleItem>div .iconfont{
  display: block;
  height: 20px;
  width: 20px;
  padding-bottom: 4px;
}
/* 标题----------------------------------------------------------------------------------- */
#MusicSheetTop .icon-fanhui{
  font-size: 19px;
  color: #fff;
}
#MusicSheetTop .icon-sousuo1{
  position: absolute;
  right: 54px;
}
#MusicSheetTop .icon-ziyuan{
  padding-right: 12px;
  font-size: 18px;
}
#MusicSheetTop .SheetCenter{
  text-align: start;
  font-size: 16px;
}
#MusicSheetTop .icon-shangbiao{
  font-size: 11PX;
  position: absolute;
  top: -4.5px;
}
#MusicSheetTop .SheetRight{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
/*图片*******************************************************************************-*/

.sheetTriple{
  position: relative;
  z-index: 3;
}
.sheetTriple>div{
  position:absolute;
  bottom: -32px;
  left:50%;
  transform:translate(-50%,-50%);
  display: flex;
  width: 270px;
  height: 34px;
  background: #fff;
  border-radius: 80px;
  box-shadow: 0px 1px 1px 1px #e6e6e6;
  padding: 0px 10px;
}
.sheetTriple>div>div{
  color: black;
  font-size: 12px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 8px 0 6px;
}
.sheetTriple>div .iconfont{
  margin-right: 6px;
}
</style>
