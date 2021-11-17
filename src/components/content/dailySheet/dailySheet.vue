<template>
<div id="dailySheet">
  <!-- 头部 -->
  <van-sticky>
    <div class="MusicSheetNavBar">
      <div class="NavBarBefore"></div>
      <navbar>
        <div slot="left" class="iconfont icon-fanhui" @click="back"></div>
        <div class="SheetCenter" slot="center">每日推荐<span class="iconfont icon-shangbiao"></span></div>
        <div slot="right" class="SheetRight">
          <span class="iconfont icon-sousuo1"></span>
          <span class="iconfont icon-ziyuan"></span>
        </div>
      </navbar>
    </div>
  </van-sticky>
  <!-- 日推上部盒子 -->
  <div class="headerBox">
    <div class="date">{{ today }}</div>
    <div class="history">历史日推</div>
    <div class="headImg"><img :src="songList[0].al.picUrl" alt=""></div>
  </div>
  <!-- 歌单 -->
  <div class="MusicSheetBottom">
    <van-cell-group v-if="songList">
      <template #title>
        <van-cell class="SheetBottomTitle">
          <template #icon>
            <div class="item-bofang"><img src="~assets/img/ProfileBox/bofang.svg" alt=""></div>
          </template>
          <template #title>
            <div>
                <div class="playAll">播放全部<span>({{songCount}})</span></div>
            </div>
          </template>
          <template #right-icon>
            <span class="Title-icon iconfont icon-xiazai"></span>
            <span class="Title-icon iconfont icon-xuanzhong"></span>
          </template>
        </van-cell>
      </template>
      <van-cell title="" v-for="(item,index) in songList" :key="index" @click="startPlay(item,songList,index)">
        <template #icon>
          <div class="item-index">
            <span v-if="item.id!==$store.state.playlist.current.id">{{index + 1}}</span>
            <span v-if="item.id===$store.state.playlist.current.id" class="iconfont icon-playing"></span>
          </div>
        </template>
        <template #title>
          <div>
            <div class="songName">
              <span>{{item.name}}</span>
              <span class="songNameAlia" v-if="item.alia.length !== 0">({{ item.alia[0] }})</span>
            </div>
            <div class="songAuthor">
              <!-- <span v-if="privileges[index].flag<=68 && privileges[index].flag>=64"  class="iconfont icon-dujiasvg"></span>
              <span v-if="privileges[index].playMaxbr>=999000" class="iconfont icon-sqsvg"></span> -->
              <span v-for="(item, index) in item.ar" :key="index">{{ item.name }}</span>
              <span class="overflowAlbum">- {{ " " + item.al.name }}</span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <div class="right-icon">
            <span v-if="item.mv !== 0" class="item-dot iconfont icon-mv2"></span>
            <span span class="item-dot iconfont icon-ziyuan"></span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</div>
</template>

<script>
import MusicSheetBottom from "../musicList/childCpn/MusicSheetBottom.vue";
import Navbar from '../../common/navbar/navbar.vue'
import {
  getDailySong
} from "network/musicList";
export default {
  components: {
    MusicSheetBottom,
    Navbar
  },
  data() {
    return {
      songList: [],
      songCount: 0,
      privileges: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getSheet() {
      getDailySong().then(res => {
        console.log(res);
        this.songList = res.data.dailySongs;
        this.songCount = res.data.dailySongs.length;
      });
    },
    startPlay (current, songList, index) {
      // songList.map( item => {
      //   item['']
      // })
      this.$store.commit('isShowPlayer') // 打开播放器
      this.$store.commit('isPlayed') // 播放过音乐 mini播放器 常驻显示
      // 清空歌单
      this.$store.state.playlist.playlist = []
      this.$store.dispatch('playlist/selectPlaylist', { current, songList, index })
    }
  },
  created() {
    this.getSheet();
  },
  computed: {
    today: function () {
      let D = new Date();
      let m = D.getMonth() + 1;
      let d = D.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return `Day${d}/Mouth${m}`;
    },
  },
};
</script>

<style lang="less"  scoped>
/* 导航 */
.MusicSheetNavBar {
  position: fixed;
  width: 375px;
  z-index: 4;
  overflow: hidden;
  top: 0;
  background: #fff;
}

.NavBarBefore {
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

.MusicSheetNavBar .nav-bar {
  /* 从父元素继承 background 属性的设置 */
  background: inherit;
  position: relative;
  z-index: 4;
}

.sheetTripleItem>div .iconfont {
  display: block;
  height: 20px;
  width: 20px;
  padding-bottom: 4px;
}

/* 标题----------------------------------------------------------------------------------- */
#dailySheet .icon-fanhui {
  font-size: 19px;
}

#dailySheet .icon-sousuo1 {
  position: absolute;
  right: 54px;
}

#dailySheet .icon-ziyuan {
  padding-right: 12px;
  font-size: 18px;
}

#dailySheet .SheetCenter {
  text-align: start;
  font-size: 16px;
}

#dailySheet .icon-shangbiao {
  font-size: 11PX;
  position: absolute;
  top: -4.5px;
}

#dailySheet .SheetRight {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/*图片*******************************************************************************-*/

  .headerBox {
    height: 180px;
    background-image: linear-gradient(
      67.2deg,
      rgba(37, 208, 199, 1) -7.5%,
      rgba(165, 90, 240, 1) 62.7%
    );
    position: relative;
    color: #fff;
    .date {
      position: absolute;
      font-family: Verdana;
      font-size: 20px;
      bottom: 60px;
      left: 10px;
    }
    .history {
      position: absolute;
      bottom: 20px;
      left: 10px;
      font-size: 10px;
      width: 60px;
      height: 24px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      text-align: center;
      line-height: 24px;
    }
    .headImg{
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 20px;
      position: absolute;
      right: 10px;
      bottom: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
