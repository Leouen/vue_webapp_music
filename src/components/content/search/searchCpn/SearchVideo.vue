<template>
  <div class="SearchVideo">
    <van-list
      v-model="loading" :finished="finished" finished-text="没有更多了" @load="getPlaylistsSearch(key)">
      <div class="video_item" v-for="(video, index) in videos" :key="index" @click="toPlayListDetail(video.id)">
        <van-image class="i_pic" :src="video.coverUrl" />
        <div class="i_info">
          <div class="name van-ellipsis">{{ video.title }}</div>
          <div class="userName van-ellipsis" v-if="video.creator">by <span v-for="(item, index) in video.creator" :key="index">{{ item.userName }}</span>
          </div>
          <div class="count van-ellipsis">
            <span v-if="video.creator"></span>
            <div class="ItemDiv"><span class="iconfont icon-bofang-tongyong"></span>{{ video.playTime | toStringNum }}</div>
          </div>
          <div class="duration">{{video.durationms/1000 | toMs}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { toStringNum, toMs } from 'common/utils'
import { _getSearchdata } from 'network/search'
export default {
  name: 'SearchSonglist',
  data () {
    return {
      key: this.keyword,
      videos: [],
      finished: false,
      loading: false,
      page: 0,
      offset: 0
    }
  },
  filters: {
    toStringNum,
    toMs
  },
  methods: {
    async getPlaylistsSearch (key) {
      this.page++
      this.offset = (this.page - 1) * 30
      await _getSearchdata(key, 1014, this.offset).then(data => {
        if (data.code === 200) {
          for (let i = 0; i < data.result.videos.length; i++) {
            this.videos.push(data.result.videos[i])
          }
          this.loading = false
          if (data.result.videos.length < 30) this.finished = true
        } else {
          console.log(data)
        }
      })
    }
    // 跳转歌单详情页
    // toPlayListDetail (id) {
    //   this.$router.push({ path: '/playlistdetail', query: { id } })
    // }
  },
  props: ['keyword'],
  mounted () {
    this.getPlaylistsSearch(this.key)
  }
}
</script>

<style lang="less" scoped>
.SearchVideo{
  background: #f5f5f5;
  width: 375px;
  height: 100vh;
  overflow: scroll;
  .van-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    .video_item{
      box-shadow: 0px 0px 10px -5px #918b8b;
      position: relative;
      flex: 50%;
      height: 148px;
      max-width: 174px;
      border-radius: 16px;
      margin-top: 10px;
      margin-bottom: 4px;
      overflow: hidden;
      background: #fff;
      box-sizing: border-box;

      .i_pic{
        width: 174px;
        border-radius: 16px;
      }
      .name{
        padding: 2px 14px;
        font-size: 14px;
        color: #333;
      }
      .userName{
        padding: 2px 14px;
        font-size: 12px;
      }
      .duration{
        position: absolute;
        bottom: 54px;
        left: 4px;
        font-size: 10px;
        color: white;
      }
      .count{
        font-size: 12px;
      }
      .ItemDiv{
        position: absolute;
        top: 4px;
        right: 4px;
        font-size: 10px;
        color: white;
        background-color: rgba(100, 100, 100, 0.4);
        padding: 1px 5px;
        border-radius: 10px;
        white-space:nowrap;
      }
      .ItemDiv>span{
        font-size: 9px;
        padding-right: 2px;
      }
    }
  }
}

</style>>
