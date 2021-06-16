<template>
  <div class="CreateList">
    <van-cell>
      <template #title>
        <span class="CreateListTitle">创建歌单</span>
      </template>
      <template #right-icon>
        <span class="iconfont icon-tianjia"></span>
        <span class="iconfont icon-ziyuan"></span>
      </template>
    </van-cell>
    <div class="songCell">
      <van-cell  v-for="items in $store.state.user.userCreateList" :key="items.id" @click="toSheet(items.id)">
        <template #title>
          <div class="mi_item">
            <div class="pic">
              <van-image :src="items.coverImgUrl" class="pic_img" />
            </div>
            <div class="info">
              <div class="i_title van-ellipsis">
                {{ items.name }}
              </div>
              <div class="dep van-ellipsis">
                {{ items.trackCount }}首，by
                {{ items.creator.nickname }}，播放{{
                  items.playCount | toStringNum
                }}次
              </div>
            </div>
          </div>
        </template>
        <template #right-icon>
          <span class="iconfont icon-ziyuan"></span>
        </template>
      </van-cell>
    </div>
    <div class="daoru">
      <van-cell>
        <template #title>
          <div class="MusicListItem">
            <div class="MusicImg">
              <span class="iconfont icon-daoru"></span>
            </div>
            <div class="MusicListItemText">
              <div>一键导入外部音乐</div>
            </div>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { toStringNum, toMs, formatDate } from 'common/utils'
export default {
  name: 'CreateList',
  methods: {
    toSheet (id) {
      this.$router.push('/musicSheet/' + id + '&' + false)
    }
  },
  filters: {
    toStringNum,
    toMs,
    formatDate
  }
}
</script>

<style lang="less" scoped>
.CreateList{
  background: white;
  width: 90%;
  border-radius: 10px;
  margin: 10px auto;
  overflow: hidden;
}
.CreateListTitle{
  color: #a4a4a4;
}
.icon-tianjia{
  margin-right: 14px;
}
.daoru{
  margin-top: -10px;
}
.MusicListItem{
  margin: 6px 0px;
  display: flex;
  align-items: center;
}
.MusicListItemText{
  padding-left: 10px;
}
.MusicImg{
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
