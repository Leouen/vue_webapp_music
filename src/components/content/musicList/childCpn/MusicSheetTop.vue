<template>
  <div id="MusicSheetTop">
    <van-sticky>
      <div class="MusicSheetNavBar">
        <div class="NavBarBefore" :style="[{backgroundImage:'url('+ (playlist.coverImgUrl) +')'}]"></div>
        <navbar>
          <div slot="left" class="iconfont icon-fanhui" @click="back"></div>
          <div class="SheetCenter" slot="center">歌单<span class="iconfont icon-shangbiao"></span></div>
          <div slot="right" class="SheetRight">
            <span class="iconfont icon-sousuo1"></span>
            <span class="iconfont icon-ziyuan"></span>
          </div>
        </navbar>
      </div>
    </van-sticky>
    <music-sheet-top-box :playlist="playlist" v-if="playlist"></music-sheet-top-box>
    <div class="sheetTriple">
      <div class="sheetTripleItem">
        <div class="borderRight">
          <span class=" iconfont icon-tianjiagedan"></span>
          <span>{{playlist.subscribedCount | toStringNum}}</span>
        </div>
        <div class="borderRight">
          <span class=" iconfont icon-liuyan"></span>
          <span>{{playlist.commentCount | toStringNum}}</span>
        </div>
        <div>
          <span class="iconfont icon-fenxiang1"></span>
          <span>{{playlist.shareCount | toStringNum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../common/navbar/navbar.vue'
import { toStringNum } from '@/common/utils'
import MusicSheetTopBox from './MusicSheetTopBox.vue'

export default {
  name: 'MusicSheetTop',
  components: { Navbar, MusicSheetTopBox },
  data () {
    return {
      scroll: ''
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
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    playlist: {
      handler (val) {
        // console.log(val)
      },
      deep: true
    }
  },
  filters: {
    toStringNum
  },
  methods: {
    handleScroll: function () {
      this.srcoll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      /* 1.默认的透明度 */
      var opacity = 0
      if (this.srcoll < 200) {
        /* 2.当页面滚动的时候---随着页面卷曲的高度变大透明度变大 */
        opacity = (this.srcoll / 200) * 1.0
      } else {
        /* 3.当页面滚动的时候---超过某一个高度的时候透明度不变 */
        opacity = 1
      }
      document.querySelector('.NavBarBefore').style.opacity = opacity
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
#MusicSheetTop{
  margin-bottom: 15px;
}
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
