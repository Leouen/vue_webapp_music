<template>
  <div id="VideoRec">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getVideo()" >
      <div class="videoearch" @click='toSearch'>
        <span class="iconfont icon-sousuo"></span>
        <span class="hotsearch">{{defultWorld}}</span>
      </div>
      <div class="video_item" v-for="(video, index) in videoRec" :key="index" @click="showVideo(video.id)">
        <div class="itemTop">
          <van-image class="i_pic" :src="video.coverUrl" />
          <div class="picBottom">
            <div class="bofang"><span class="iconfont icon-bofangshu"></span> {{ video.playCount | toStringNum }}</div>
            <div class="comment"><span class="iconfont icon-danmushu"></span>{{ video.commentCount | toStringNum }}</div>
          </div>
          <div class="duration">{{video.duration/1000 | toMs}}</div>
        </div>
        <div class="itemBottom">
          <div class="name">{{ video.name }}</div>
          <div class="author">
            <div class="author_pic" v-for="(item,index) in video.artists" :key="index">
              <img :src="item.img1v1Url" alt="">
              <div>{{item.name}}</div>
            </div>
            <div class="likeCount"><span class="iconfont icon-zan"></span>{{ video.likeCount | toStringNum }}</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { toStringNum, toMs, formatDate } from 'common/utils'
import { getVideoRec } from 'network/video'
import { _getDefaultHotKey } from 'network/search'
export default {
  name: 'VideoRec',
  filters: {
    toStringNum,
    toMs,
    formatDate
  },
  data () {
    return {
      defultWorld: null,
      videoRec: [],
      finished: false,
      loading: false,
      page: 0,
      offset: 0
    }
  },
  methods: {
    async getVideo () {
      await getVideoRec().then(res => {
        if (res === undefined) {
          console.log('请登录')
        } else {
          console.log(res)
          for (let i = 0; i < res.datas.length; i++) {
            this.videoRec.push(res.datas[i].data)
          }
          console.log(this.videoRec)
        }
      })
    },
    toSearch () {
      this.$router.push('/search')
    },
    showVideo (id) {
      this.$store.commit('isShowVideo')
      this.$store.commit('video/setCurrentId', id)
      this.$store.dispatch('video/getUrl', true)
    }
  },
  mounted () {
    // this.getVideo()
  },
  created () {
    _getDefaultHotKey().then(res => {
      // console.log(res)
      this.defultWorld = res.data.showKeyword
    })
  }
}

</script>

<style lang="less" scoped>
#VideoRec{
  background: #f5f5f5;
  width: 375px;
  height: 100vh;
  overflow: scroll;
  .videoearch{
    height: 30px;
    width: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eeeeee;
    border-radius: 30px;
    font-size: 14px;
    color: #959595;
    margin: 10px 0;
    .hotsearch{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 260px;
    }
  }
  .van-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    .video_item{
      box-shadow: 0px 0px 10px -5px #918b8b;
      position: relative;
      width: 178px;
      margin-bottom: 10px;
      border-radius: 12px;
      overflow: hidden;
      background: #fff;
      box-sizing: border-box;
      .itemTop{
        height: 134px;
        position: relative;
        display: flex;
        align-items: center;
        .i_pic{
          width: 178px;
          height: 134px;
          display: block;
        }
        .picBottom{
          position: absolute;
          bottom: 4px;
          width: 100%;
          font-size: 10px;
          color: white;
          display: flex ;
          justify-content: space-between;
          align-items: center;
          .iconfont{
            font-size: 16px;
            margin: 0 4px;
          }
          .bofang{
            display: flex;
            align-items: center;
          }
          .comment{
            padding-left: 4px;
            padding-right: 10px;
            display: flex;
            align-items: center;
          }
        }
        .duration{
          position: absolute;
          top: 8px;
          right: 10px;
          font-size: 10px;
          color: white;
        }
      }
      .itemBottom{
        padding: 4px 6px 2px 2px;
        .name{
          font-size: 12px;
          line-height: 12px;
          height: 24px;
          color: black;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .author{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .author_pic{
            flex: 70%;
            display: flex;
            align-items: center;
            color: black;
            font-size: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .author_pic img{
            display: block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid #fff;
            margin-right: 4px;
          }
          .author_pic div{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 8px;
          }
          .likeCount{
            flex: 30%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 10px;
            color: #918b8b;
            .iconfont{
              font-size: 10px;
              padding-right: 3px;
            }
          }
        }
      }
    }
  }
}

</style>>
