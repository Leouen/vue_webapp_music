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
    <div class="daoru">
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
export default {
  name: 'CollectList'
}
</script>

<style>
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
</style>
