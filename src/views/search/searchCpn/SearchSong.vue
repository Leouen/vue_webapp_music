<template>
  <div class="SearchSong">
    <van-cell class="SheetBottomTitle">
      <template #icon>
        <div class="item-bofang"><span class="iconfont icon-bofang1"></span></div>
      </template>
      <template #title>
        <div><div class="playAll">播放全部</div></div>
      </template>
      <template #right-icon>
        <span class="Title-icon iconfont icon-xuanzhong"></span>
      </template>
    </van-cell>
    <van-list v-model="loading" :finished="finished" @load="getSongsSearch(key)" finished-text="没有更多了" >
      <van-cell title="" v-for="(item,index) in songs" :key="index">
        <template #title>
          <div>
            <div class="songName">
              <span>{{item.name}}</span>
              <span class="songNameAlia" v-if="item.transNames">({{ item.transNames[0] }})</span>
            </div>
            <div class="songAuthor">
              <span v-if="item.fee===1" class="iconfont icon-dujiasvg"></span>
              <span v-if="item.fee!==0" class="iconfont icon-sqsvg"></span>
              <span v-for="(ar, index) in item.artists" :key="index">{{ ar.name }}</span>
              <span class="overflowAlbum">- {{ " " + item.album.name }}</span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <div class="right-icon">
            <span v-if="item.mvid !== 0" class="item-dot iconfont icon-mv2"></span>
            <span span class="item-dot iconfont icon-ziyuan"></span>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { _getSearchdata } from 'network/search'
export default {
  props: ['keyword'],
  mounted () {},
  data () {
    return {
      key: this.keyword,
      songs: [],
      finished: false,
      loading: false,
      page: 0,
      offset: 0
    }
  },
  methods: {
    async getSongsSearch (key) {
      this.page++
      this.offset = (this.page - 1) * 30
      await _getSearchdata(key, 1, this.offset).then(res => {
        if (res.code === 200) {
          // console.log(res)
          for (let i = 0; i < res.result.songs.length; i++) {
            this.songs.push(res.result.songs[i])
          }
          this.loading = false
          if (res.result.songs.length < 30) this.finished = true
        } else {
          console.log(res)
        }
      })
    },
    // 播放音乐
    playThisMusic (id) {
      this.$bus.$emit('playThisMusic', id)
    }
  }
}
</script>

<style lang="less" scoped>
.SearchSong{
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow: scroll;
  .van-cell{
    padding-left: 19px;
  }
  .item-bofang{
    display: flex;
    align-items: center;
  }
  .item-bofang .icon-bofang1{
    font-size: 22px;
    height: 24px;
    width: 24px;
    margin-right: 8px;
    color: #ff4a3d;
  }
  .icon-xuanzhong{
    font-size: 20px;
    padding-bottom: 3px;
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
}
</style>>
