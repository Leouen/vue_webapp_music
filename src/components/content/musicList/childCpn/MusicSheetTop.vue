<template>
  <div id="MusicSheetTop" :style="[{background:'#adadad'}]">
    <van-sticky>
      <navbar class="MusicSheetNavBar" :style="[{background:'#adadad'}]">
        <div slot="left" class="iconfont icon-fanhui" @click="back"></div>
        <div class="SheetCenter" slot="center">歌单<span class="iconfont icon-shangbiao"></span></div>
        <div slot="right" class="SheetRight">
          <span class="iconfont icon-sousuo1"></span>
          <span class="iconfont icon-ziyuan"></span>
        </div>
      </navbar>
    </van-sticky>
    <div id="sheetTopBox">
      <div class="TopBoxLeft">
        <div class="SheetItemImg">
          <div class="ItemImg"><img alt="" :src="playlist.picUrl?playlist.picUrl:playlist.coverImgUrl"></div>
          <div class="ItemDiv"><span class="iconfont icon-bofang-tongyong"></span>{{playlist.playCount}}</div>
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
    <div class="sheetTriple">
      <div class="sheetTripleItem">
        <div class="borderRight">
          <span class=" iconfont icon-tianjiagedan"></span>
          <span>{{playlist.subscribedCount}}</span>
        </div>
        <div class="borderRight">
          <span class=" iconfont icon-liuyan"></span>
          <span>{{playlist.commentCount}}</span>
        </div>
        <div>
          <span class="iconfont icon-fenxiang1"></span>
          <span>{{playlist.shareCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../common/navbar/navbar.vue'
export default {
  name: 'MusicSheetTop',
  components: { Navbar },
  data () {
    return {
    }
  },
  props: {
    playlist: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    console.log(this.playlist)
    console.log(this.playlist.id)
  },
  mounted () {
    console.log(this.playlist)
    console.log(this.playlist.id)
    // if (this.playlist.playCount) {
    //   this.ImgColor(this.playlist.playCount)
    // }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    ImgColor (img) {
      window.RGBaster.colors(img, {
        // 调色板大小，就是提取的样本，越大越精确，同时性能越差
        paletteSize: 30,
        // 颜色排除
        exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
        success: function (payload) {
          // 主题颜色
          console.log(payload.dominant)
          this.BGCcolor = payload.dominant
        }
      })
    },
    changeColor () {
      document.querySelector('.MusicSheetTop').style.background = this.BGCcolor
      document.querySelector('.MusicSheetNavBar').style.background = this.BGCcolor
    }
  },
  watch: {
    // playlist () {
    //   this.ImgColor(this.playlist.coverImgUrl)
    // }
  }
}
</script>

<style scoped>
#MusicSheetTop{
  margin-bottom: 15px;
}
/* 盒子 */
#sheetTopBox{
  height: 160px;
  display: flex;
  align-items: center;
  margin: 10px 8px;
  padding-bottom: 40px;
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
#MusicSheetTop .SheetRight{
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
/*图片*******************************************************************************-*/
#MusicSheetTop .TopBoxLeft{
  width: 108px;
  padding: 0px 6px;
  margin-top: 5px;
}
#MusicSheetTop .SheetItemImg{
  width: 108px;
  text-align: center;
  position: relative;
}
#MusicSheetTop .SheetItemImg>.ItemImg{
  width: 108px;
  height: 108px;
  border-radius: 14px;
  background: #f2f2f2;
}
#MusicSheetTop .SheetItemImg>.ItemImg img{
  width: 100%;
  border-radius: 12px;
  box-shadow: 0px -10px 0px -5px rgba(163, 163, 177, 0.493);
}
#MusicSheetTop .SheetItemImg>.ItemDiv{
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
#MusicSheetTop .SheetItemImg>.ItemDiv>span{
  font-size: 9px;
  padding-right: 2px;
}

/* */
.sheetTriple{
  position: relative;
}
.sheetTriple>div{
  position:absolute;
  bottom: -23px;
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
