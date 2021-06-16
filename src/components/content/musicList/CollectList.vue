<template>
  <div class="CollectList">
    <van-cell>
      <template #title>
        <span class="CollectListTitle">收藏歌单</span>
      </template>
      <template #right-icon>
        <span class="iconfont icon-ziyuan"></span>
      </template>
    </van-cell>
    <div class="songCell" v-if="$store.state.user.isLogin!==false">
      <van-cell  v-for="items in $store.state.user.userSubList" :key="items.id" @click="toSheet(items.id)">
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
    <div class="daoru" v-else>
      <van-cell>
        <template #title>
          <div class="MusicListItemNone">
              <div>暂无收藏歌单</div>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { toStringNum, toMs, formatDate } from 'common/utils'
export default {
  name: 'CollectList',
  filters: {
    toStringNum,
    toMs,
    formatDate
  },
  methods: {
    toSheet (id) {
      this.$router.push('/musicSheet/' + id + '&' + false)
    }
  }
}
</script>

<style lang="less">
.CollectList{
  background: white;
  width: 90%;
  border-radius: 10px;
  margin: 10px auto;
  overflow: hidden;
}
.CollectListTitle{
  color: #a4a4a4;
}
.MusicListItemNone{
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a3a3a3;
}
.mi_item {
  margin-bottom: 5px;
  height: 54px;
  display: flex;
  align-items: center;
  .pic {
    width: 46px;
    height: 46px;
    border-radius: 6px;
    overflow: hidden;
    .pic_img {
      width: inherit;
      height: inherit;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    width: 200px;
    .i_title {
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      color: black;
    }
    .dep {
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      margin-top: 4px;
      color: #919191;
    }
  }
}
.songCell .van-cell{
  padding: 0px 16px;
}
</style>
