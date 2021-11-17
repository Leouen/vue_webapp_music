<template>
<div id="rankTop">
  <van-sticky>
    <div class="MusicSheetNavBar">
      <div class="NavBarBefore"></div>
      <navbar>
        <div slot="left" class="iconfont icon-fanhui" @click="back"></div>
        <div class="SheetCenter" slot="center">排行榜<span class="iconfont icon-shangbiao"></span></div>
        <div slot="right" class="SheetRight">
          <span class="iconfont icon-sousuo1"></span>
          <span class="iconfont icon-ziyuan"></span>
        </div>
      </navbar>
    </div>
  </van-sticky>
  <div class="rank-official" v-if="top">
    <h1 class="rank-title">官方榜</h1>
    <ul class="rank-official-list">
      <li @click="toSheet(item.id)" :key="item.id" class="rank-official-item" v-for="(item) in top.slice(0,4)">
        <div class="song-cover">
          <img class="song-cover-img" :src="item.coverImgUrl" alt="">
        </div>
        <ul class="tracks-list" v-if="item.tracks">
          <li :key="index" v-for="(song,index) in item.tracks" class="tracks-item">
            <span class="index">{{index+1}}.</span>
            <span class="name">{{song.first}}-{{song.second}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="rank-recommend">
    <h1 v-if="top.slice(4).length>0" class="rank-title">榜单推荐</h1>
    <ul class="rank-list">
      <li @click="toSheet(item.id)" :key="item.id" v-for="(item) in top.slice(4)" class="rank-item">
        <div class="song-cover">
          <img class="song-cover-img" v-lazy="item.coverImgUrl" alt="">
        </div>
        <p class="text">{{item.name}}</p>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import Navbar from '../../common/navbar/navbar.vue'
import {
  getRank
} from 'network/musicList'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      top: false
    }
  },
  created() {
    this.getTop()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    toSheet(id) {
      this.$router.push('/musicSheet/' + id + '&' + false)
    },
    async getTop() {
      await getRank().then(res => {
        console.log(res);
        if (res.code === 200) {
          this.top = res.list
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/* 导航 */
.MusicSheetNavBar {
  position: fixed;
  width: 375px;
  top: 0;
  z-index: 4;
  overflow: hidden;
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
#rankTop .icon-fanhui {
  font-size: 19px;
  /* color: #fff; */
}

#rankTop .icon-sousuo1 {
  position: absolute;
  right: 54px;
}

#rankTop .icon-ziyuan {
  padding-right: 12px;
  font-size: 18px;
}

#rankTop .SheetCenter {
  text-align: start;
  font-size: 16px;
}

#rankTop .icon-shangbiao {
  font-size: 11PX;
  position: absolute;
  top: -4.5px;
}

#rankTop .SheetRight {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/****     官方排行榜 */
  .rank-official {
    margin-top: 50px;
    padding: 0 16px;

    .rank-title {
      font-size: 20px;
      font-weight: 600;
      color: rgb(51,51,51);
    }

    .rank-official-list {

      .rank-official-item {
        display: flex;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        .song-cover {
          width: 120px;
          height: 120px;
          flex: 0 0 120px;

          .song-cover-img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }

        .tracks-list {
          flex: 1;
          font-size: 12px;
          color: rgb(102, 102, 102);
          margin-top: 12px;

          .tracks-item {
            margin-left: 16px;
            margin-bottom: 29px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
/****     底部排行榜 */
  .rank-recommend {
    padding: 0 16px;
    .rank-title {
      font-size: 20px;
      font-weight: 600;
      color: rgb(51,51,51);
      // margin-left: 7.5px;
      // margin-bottom: 18px;
      padding-top: 10px;
    }
    .rank-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .rank-item {
        flex: 33%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .song-cover {
          width: 100px;
          height: 100px;
          font-size: 0;
          .song-cover-img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }
        .text {
          font-size: 12px;
          margin-top: 13px;
          text-align: center;
          padding: 0 7px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 100px;
        }
      }
    }
  }
</style>
