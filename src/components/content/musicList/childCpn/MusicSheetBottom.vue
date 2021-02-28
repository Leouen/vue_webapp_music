<template>
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
      <van-cell title="" v-for="(item,index) in songList" :key="index">
        <template #icon>
          <div class="item-index"><span>{{index + 1}}</span></div>
        </template>
        <template #title>
          <div>
            <div class="songName">
              <span>{{item.songName}}</span>
              <span class="songNameAlia" v-if="item.alia.length !== 0">({{ item.alia[0] }})</span>
            </div>
            <div class="songAuthor">
              <span v-if="privileges[index].flag<=68 && privileges[index].flag>=64"  class="iconfont icon-dujiasvg"></span>
              <span v-if="privileges[index].playMaxbr>=999000" class="iconfont icon-sqsvg"></span>
              <span v-for="(item, index) in item.author" :key="index">{{ item.name }}</span>
              <span class="overflowAlbum">- {{ " " + item.album }}</span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <div class="right-icon">
            <span v-if="item.mvId !== 0" class="item-dot iconfont icon-mv2"></span>
            <span span class="item-dot iconfont icon-ziyuan"></span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'MusicSheetBottom',
  props: {
    songCount: {
      type: Number,
      default: -1
    },
    songList: {
      type: Array,
      default () {
        return []
      }
    },
    privileges: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.MusicSheetBottom .van-cell-group__title {
    padding: 16px 0px 8px;
    margin: 0px 11px;
}
.MusicSheetBottom .van-cell{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 0px;
}
.SheetBottomTitle{
  padding: 0;
}
.right-icon{
  width: 54px;
  display: flex;
  justify-content: flex-end;
}
.item-index{
  width: 50px;
  text-align: center;
  color: #adadad;
}
.item-index div{
  text-align: center;
}
.item-dot{
  color: #adadad;
}
.item-dot.icon-mv2{
  padding-right: 10px;
  font-size: 18px;
}
.item-dot.icon-ziyuan{
  padding-left: 10px;
}
.songName{
  width: 250px;
  margin-bottom: -3px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songNameAlia{
  color: #adadad;
}
.songAuthor{
  display: flex;
  align-items: center;
  width: 250px;
  margin-top: -3px;
  color: #adadad;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.songAuthor .overflowAlbum{
  padding-left: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon-sqsvg, .icon-dujiasvg{
  font-size: 19px;
  color: #ff3f3f;
  padding-right: 2px;
}
.item-bofang{
  display: flex;
  align-items: center;
}
.item-bofang>img{
  height: 20px;
  width: 20px;
  margin-right: 8px;
  margin-bottom: 3px;
}
.playAll{
  font-weight: 600;
}
.playAll span{
  margin-left: 6px;
  font-weight: 400;
  font-size: 12px;
  color: #adadad;
}
.Title-icon{
  width: 28px;
  font-size: 19px;
  padding-left: 4px;
}
.icon-xiazai{
  margin-right: 10px;
}
</style>
