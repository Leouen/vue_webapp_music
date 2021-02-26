<template>
  <div class="MusicSheet">
    <div class="MusicSheetTop" style="background:#8a8a8a">
      <navbar class="MusicSheetNavBar" style="background:#8a8a8a">
        <div slot="left" class="iconfont icon-fanhui" @click="back"></div>
        <div class="SheetCenter" slot="center">歌单<span class="iconfont icon-shangbiao"></span></div>
        <div slot="right" class="SheetRight">
          <span class="iconfont icon-sousuo1"></span>
          <span class="iconfont icon-ziyuan"></span>
        </div>
      </navbar>
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
              <span class="level" v-if="playlist.creator.avatarDetail" ><img :src="playlist.creator.avatarDetail.identityIconUrl" alt=""></span>
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
  </div>
</template>

<script>
import Navbar from '../../common/navbar/navbar.vue'
import { getlistDetial } from 'network/musicList'
export default {
  name: 'MusicSheet',
  components: { Navbar },
  data () {
    return {
      count: null,
      BGCcolor: '#d1d1d1',
      playlist: {
        id: null,
        name: null,
        coverImgUrl: null,
        playCount: null,
        commentCount: null,
        shareCount: null,
        subscribedCount: null,
        description: null,
        creator: {
          nickname: null,
          avatarUrl: null,
          avatarDetail: {}
        }
      } // 歌单信息
    }
  },
  async created () {
    this.changeSheetId(this.$route.params.id)
    await getlistDetial(this.$route.params.id).then((res) => {
      console.log(res)
      this.playlist.id = res.playlist.id
      this.playlist.name = res.playlist.name
      this.playlist.coverImgUrl = res.playlist.coverImgUrl
      this.playlist.playCount = res.playlist.playCount
      this.playlist.commentCount = res.playlist.commentCount
      this.playlist.shareCount = res.playlist.shareCount
      this.playlist.subscribedCount = res.playlist.subscribedCount
      this.playlist.description = res.playlist.description
      this.playlist.creator.nickname = res.playlist.creator.nickname
      this.playlist.creator.avatarDetail = res.playlist.creator.avatarDetail
      this.playlist.creator.avatarUrl = res.playlist.creator.avatarUrl
    })
  },
  mounted () {
    // this.ImgColor()
    // this.changeColor()
  },
  methods: {
    changeSheetId (newID) {
      this.$store.commit('changeSheetId', newID)
    },
    back () {
      this.$router.go(-1)
    },
    ImgColor () {
      window.RGBaster.colors('https://p2.music.126.net/fob5pHV3xzGlJ_-KEeLFLg==/109951165693966983.jpg', {
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
  }
}
</script>

<style>
.MusicSheet{
  color: white;
  height: 1000px;
  background: #fff;
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
  display: inline-block;
  height: 8px;
  position: absolute;
  bottom: 14px;
  right: 0px;
}
.level img{
  width: 10px;
}
/* 标题----------------------------------------------------------------------------------- */
#sheetTopBox .icon-fanhui{
  font-size: 20px;
}
.SheetRight{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#sheetTopBox .icon-sousuo1{
  position: absolute;
  right: 54px;
}
#sheetTopBox.icon-ziyuan{
  padding-right: 12px;
  font-size: 18px;
}
#sheetTopBox .SheetCenter{
  text-align: start;
  font-size: 16px;
}
#sheetTopBox .icon-shangbiao{
  font-size: 11PX;
  position: absolute;
  top: -4.5px;
}
/*图片*******************************************************************************-*/
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
  right: 14px;
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
</style>
