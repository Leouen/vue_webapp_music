<template>
  <div class="SearchAuthor">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getArtistsSearch(key)">
      <div class="ar_item" v-for="(artist, index) in artists" :key="index" @click="toArtistDetail(artist.id)" >
        <div class="ar_avatar">
          <van-image :src="artist.img1v1Url" round fit="cover" class="pic" />
        </div>
        <div class="ar_name van-ellipsis">
          {{ artist.name }}
          <span class="iconfont icon-nan"  v-if="artist.gender === 1"></span>
          <span class="iconfont icon-nv" v-else></span>
          <span v-if="artist.alia" class="name">( {{ artist.alia[0] }} )</span>
          <span v-else-if="artist.trans" class="name" >( {{ artist.trans }} )</span >
        </div>
        <div class="follow">
          <div class="btn1" v-if="artist.followed">已关注</div>
          <div class="btn2" v-else>
            <van-icon class="folow-icon" name="plus" />关注
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { _getSearchdata } from 'network/search'
export default {
  data () {
    return {
      key: this.keyword,
      artists: [],
      finished: false,
      loading: false,
      page: 0,
      offset: 0
    }
  },
  props: ['keyword'],
  methods: {
    async getArtistsSearch (key) {
      this.page++
      this.offset = (this.page - 1) * 30
      await _getSearchdata(key, 100, this.offset).then(data => {
        // console.log(data)
        if (data.code === 200) {
          for (let i = 0; i < data.result.artists.length; i++) {
            this.artists.push(data.result.artists[i])
          }
          this.loading = false
          if (data.result.artists.length < 30) this.finished = true
        } else {
          console.log(data)
        }
      })
    },
    toArtistDetail (id) {
      this.$router.push({ path: '/artist', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.SearchAuthor {
  width: 100%;
  background-color: #fff;
  height: 100vh;
  overflow: scroll;
  .ar_item {
    height: 60px;
    margin-top: 6px;
    display: flex;
    align-items: center;
    .ar_avatar {
      margin-left: 10px;
      width: 46px;
      height: 46px;
      .pic {
        width: 46px;
        height: 46px;
      }
    }
    .ar_name {
      width: 220px;
      margin-left: 10px;
      font-size: 15px;
      padding: 20px 0;
      border-bottom: 1px solid #e7e7e7;
      .name {
        color: #969799;
        margin-left: 4px;
      }
    }
    .follow {
      width: 70px;
      display: inline-block;
      .btn1 {
        width: 64px;
        height: 24px;
        font-size: 11.6px;
        color: #4a4a4a;
        border: 1px solid #989898;
        border-radius: 15px;
        text-align: center;
        line-height: 24px;
      }
      .btn2 {
        width: 60px;
        height: 22px;
        font-size: 11.6px;
        color: #ff3a3a;
        border: 1px solid #ff3a3a;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .folow-icon {
          font-size: 10px;
          padding-right: 4px;
        }
      }
    }
  }
}
</style>
