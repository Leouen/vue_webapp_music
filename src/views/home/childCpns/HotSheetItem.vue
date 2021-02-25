<template>
  <div class="HotSheetItem">
    <div class="HotSheetItemSong" v-for="(item, index) in itemDetail" :key="index">
      <div class="HotSheetItemSong-img"><img :src="item.picUrl" alt="" v-lazy="item.picUrl"><span class="iconfont icon-bofang" ></span></div>
      <div class="HotSheetItemSong-text">
        <span class="HotSheetItemSong-name">{{item.name}}</span>
        <span class="HotArtistName"> - {{item.artists}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSheetItem',
  props: {
    itemDetail: {
      type: Array
    }
  },
  methods: {
  }
}
</script>

<style>
.HotSheetItemSong{
  height: 50px;
  display: flex;
  align-items: center;
  margin: 10px 14px 4px 14px;
  position: relative;
  overflow: hidden;
}
.HotSheetItemSong>.HotSheetItemSong-img>img{
  width: 50px;
  border-radius: 8px;
  margin-top: 3px;
  margin-right: 10px;
}
.HotSheetItemSong .HotSheetItemSong-text{
  flex: 1;
  display: flex;
  align-items: center;
}
.HotSheetItemSong-name{
  padding-right: 5px;
  font-size: 16px;
  color: #000;
  white-space: nowrap;
}
.HotArtistName{
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.HotSheetItemSong-img>.icon-bofang{
  position: absolute;
  top: 13.5px;
  left: 16px;
  font-size: 21px;
  color: white;
  opacity: 0.8;
}
</style>
