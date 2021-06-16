<template>
  <div id="searchTopBar" sticky>
    <van-tabs animated swipeable>
      <van-tab title="综合">
        <search-all :keyword="keyword"></search-all>
      </van-tab>
      <van-tab title="单曲">
        <search-song :keyword="keyword"></search-song>
      </van-tab>
      <van-tab title="歌单">
        <search-songlist :keyword="keyword"></search-songlist>
      </van-tab>
      <van-tab title="视频">
        <search-video :keyword="keyword"></search-video>
      </van-tab>
      <van-tab title="歌手">
        <search-author :keyword="keyword"></search-author>
      </van-tab>
      <van-tab title="专辑">
        <search-album :keyword="keyword"></search-album>
      </van-tab>
      <van-tab title="用户">
        <search-user :keyword="keyword"></search-user>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { _getSearchdata } from 'network/search'
import SearchAll from './searchCpn/SearchAll.vue'
import SearchSong from './searchCpn/SearchSong.vue'
import SearchSonglist from './searchCpn/SearchSonglist.vue'
import SearchVideo from './searchCpn/SearchVideo.vue'
import SearchAuthor from './searchCpn/SearchAuthor.vue'
import SearchAlbum from './searchCpn/SearchAlbum.vue'
import SearchUser from './searchCpn/SearchUser.vue'
export default {
  data () {
    return {
      keyword: this.$route.query.val
    }
  },
  methods: {},
  components: {
    SearchAll,
    SearchSong,
    SearchSonglist,
    SearchVideo,
    SearchAlbum,
    SearchUser,
    SearchAuthor
  },
  mounted () {
    this.$emit('backKeyw', this.keyword)
  }
}
</script>

<style>
#searchTopBar .van-tabs__wrap{
  margin-bottom: -8px;
}
#searchTopBar .van-tabs__nav{
  background: #fff;
  height: 30px;
}
#searchTopBar .van-tabs__line{
  width: 32px;
  bottom: 22px;
}
#searchTopBar .van-tab__text{
  z-index: 2;
  font-size: 14px;
}
#searchTopBar .van-tab--active{
  font-weight: bold;
  color: #000;
}
.van-tabs--line .van-tabs__wrap{
  height: 40px;
}
</style>
