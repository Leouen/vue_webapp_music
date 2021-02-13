<template>
  <div class="HotSheetItem">
    <div class="HotSheetItemSong" v-for="(item, index) in itemDetail" :key="index">
      <div class="HotSheetItemSong-img"><img :src="item.picUrl" alt=""><span class="iconfont icon-bofang" ></span></div>
      <div class="HotSheetItemSong-text">
        <span class="HotSheetItemSong-name">{{item.name}}</span>
        <span> - {{item.artists}}</span>
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
  }
}
</script>

<style>
.HotSheetItemSong{
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0px 14px 12px;
  position: relative
}
.HotSheetItemSong>.HotSheetItemSong-img>img{
  width: 50px;
  border-radius: 8px;
  margin-right: 10px;
}
.HotSheetItemSong .HotSheetItemSong-text{
  flex: 1;
}
.HotSheetItemSong-name{
  font-size: 16px;
  color: #000;
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
