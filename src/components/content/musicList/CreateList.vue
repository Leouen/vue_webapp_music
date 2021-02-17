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
export default {
  name: 'CreateList'
}
</script>

<style>
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
