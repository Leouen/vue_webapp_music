<template>
  <div class="SearchAll">
    <!-- 单曲 -->
    <div class="list_div">
      <div class="s_title">
        <span>单曲</span>
        <div class="r-title-word" @click="playAll(song.songs)"><a class=""><span class="iconfont icon-bofang" ></span><span> 播放</span></a></div>
      </div>
      <van-empty image="error" description="暂无相关的任何单曲" v-if="!song.songs" />
      <div class="songList" v-else>
        <van-cell title="" v-for="(item,index) in song.songs" :key="index">
          <template #title>
            <div @click="playSingleSong(item)">
              <div class="songName">
                <span>{{item.name}}</span>
                <span class="songNameAlia" v-if="item.transNames">({{ item.transNames[0] }})</span>
              </div>
              <div class="songAuthor">
                <span v-if="item.fee===1" class="iconfont icon-dujiasvg"></span>
                <span v-if="item.fee!==0" class="iconfont icon-sqsvg"></span>
                <span v-for="(ar, index) in item.ar" :key="index">{{ ar.name }}</span>
              </div>
            </div>
          </template>
          <template #right-icon>
            <div class="right-icon">
              <span v-if="item.mv !== 0" class="item-dot iconfont icon-mv2"></span>
              <span span class="item-dot iconfont icon-ziyuan"></span>
            </div>
          </template>
        </van-cell>
      </div>
      <div class="s_more" v-if="song.more"> {{ song.moreText }} </div>
    </div>
    <!-- 专辑 -->
    <div class="list_div">
      <div class="s_title">专辑</div>
      <van-empty image="error" description="暂无相关的任何专辑" v-if="!album.albums" />
      <div class="album_list" v-else>
        <div class="album_item" v-for="(item, index) in album.albums" :key="index" @click="toAlbumDetail(item.id)">
          <div class="album_pic">
            <div class="bg"></div>
            <van-image class="album_img" :src="item.picUrl" />
          </div>
          <div class="album_info">
            <div class="album_name">{{ item.name }}</div>
            <div class="album_by"> {{ item.artist.name }} {{ item.publishTime | formatDate }} </div>
          </div>
        </div>
      </div>
      <div class="s_more" v-if="album.more"> {{ album.moreText }} </div>
    </div>
    <!-- 歌单 -->
    <div class="list_div">
      <div class="s_title">歌单</div>
      <van-empty image="error" description="暂无相关的任何歌单" v-if="!playList.playLists" />
      <div class="playList" v-else>
        <div class="playlist_item" v-for="(item, index) in playList.playLists" :key="index" @click="toPlayListDetail(item.id)">
          <van-image class="i_pic" :src="item.coverImgUrl" />
          <div class="i_info">
            <div class="name van-ellipsis">{{ item.name }}</div>
            <div class="count van-ellipsis">
              {{ item.trackCount }}首,
              <span v-if="item.creator">by {{ item.creator.nickname }}</span>,
              播放{{ item.playCount | toStringNum }}次
            </div>
          </div>
        </div>
      </div>
      <div class="s_more" v-if="playList.more">{{ playList.moreText }}</div>
    </div>
    <!-- 歌手 -->
    <div class="list_div">
      <div class="s_title">歌手</div>
      <van-empty image="error" description="暂无相关的任何歌手" v-if="!artist.artists"/>
      <div class="ar_item" v-else v-for="(artist, index) in artist.artists" :key="index" @click="toArtistDetail(item.id)">
        <div class="ar_avatar">
          <van-image :src="artist.picUrl" round fit="cover" class="pic" />
        </div>
        <div class="ar_name van-ellipsis">
          {{ artist.name }}
          <span class="iconfont icon-nan"  v-if="user.gender === 1"></span>
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
      <div class="s_more" v-if="artist.more">{{ artist.moreText }}</div>
    </div>
    <!-- 视频 -->
    <div class="list_div">
      <div class="s_title">视频</div>
      <van-empty image="error" description="暂无相关的任何视频" v-if="!video.videos"/>
      <div class="videoList" v-else>
        <div class="video_item" v-for="(video, index) in video.videos" :key="index" @click="toPlayListDetail(video.id)">
          <div class="video_img">
            <van-image class="i_pic" :src="video.coverUrl" />
            <span class="iconfont icon-bofang"></span>
          </div>
          <div class="i_info">
            <div class="name">{{ video.title }}</div>
            <div class="video_info van-ellipsis">
               <span><span class="duration">{{video.durationms/1000 | toMs}}</span>, by <span v-for="(item, index) in video.creator" :key="index">{{ item.userName }}</span></span>
              <span v-if="video.creator"></span>,
              <span class="ItemDiv">播放{{ video.playTime | toStringNum }}次</span>
            </div>
          </div>
        </div>
      </div>
      <div class="s_more" v-if="video.more"> {{ video.moreText }} </div>
    </div>
    <!-- 用户 -->
    <div class="list_div">
      <div class="s_title">用户</div>
      <van-empty image="error" description="暂无相关的任何用户" v-if="!user.users" />
      <div class="usersList" v-else>
        <div class="user_item" v-for="(user, index) in user.users" :key="index" @click="toUserInfoDetailPage(user.userId)" >
          <div class="avatar">
            <van-image :src="user.avatarUrl" round fit="cover" class="pic" />
            <van-image v-if="user.avatarDetail" :src="user.avatarDetail.identityIconUrl" round fit="cover" class="identity" />
          </div>
          <div class="info">
            <div class="i_name">
              <div class="name van-ellipsis">{{ user.nickname }}
                <span class="iconfont icon-nan"  v-if="user.gender === 1"></span>
                <span class="iconfont icon-nv" v-else></span>
              </div>
              <van-icon class-prefix="my-icon" class="sex1" v-if="user.gender === 2" name="women2"/>
              <van-icon class-prefix="my-icon" class="sex2" v-else-if="user.gender === 1" name="man2"/>
            </div>
            <div class="i_signature" v-if="user.avatarDetail">网易音乐人</div>
            <div class="i_signature van-ellipsis" v-else>
              {{ user.signature }}
            </div>
          </div>
          <div class="follow">
            <div class="btn1" v-if="user.followed">已关注</div>
            <div class="btn2" v-else>
              <van-icon class="folow-icon" name="plus" />关注
            </div>
          </div>
        </div>
      </div>
      <van-cell :value="user.moreText" value-class="s_more" v-if="user.more" />
    </div>
  </div>
</template>

<script>
import { _getSearchdata } from 'network/search'
import { toStringNum, toMs, formatDate } from 'common/utils'
export default {
  props: ['keyword'],
  data () {
    return {
      song: {},
      album: {},
      playList: {},
      artist: {},
      user: {},
      video: {}
    }
  },
  filters: {
    toStringNum,
    toMs,
    formatDate
  },
  methods: {
    // 获取 <综合> 里面的数据
    async getCompositedata (keywords, type) {
      await _getSearchdata(keywords, type).then(res => {
        if (res.code === 200) {
          // console.log(res)
          let data = res.result
          if (data.song) this.song = data.song
          if (data.album) this.album = data.album
          if (data.playList) this.playList = data.playList
          if (data.artist) this.artist = data.artist
          if (data.user) this.user = data.user
          if (data.video) this.video = data.video
        } else {
          // console.log(res)
        }
      })
    },
    // 跳转歌单详情页
    toPlayListDetail (id) {
      this.$router.push({ path: '/playlistdetail', query: { id } })
    },
    toAlbumDetail (id) {
      this.$router.push({ path: '/albumDetail', query: { id } })
    },
    toArtistDetail (id) {
      this.$router.push({ path: '/artist', query: { id } })
    },
    // 跳转用户详情页
    toUserInfoDetailPage (id) {
      this.$router.push({ path: '/userinfo', query: { id } })
    },
    // 播放音乐
    playSingleSong (singleSong) {
      // 通过ID获取歌曲详情信息
      let flag = false
      if (this.$store.state.playlist.playlist !== []) {
        for (let item of this.$store.state.playlist.playlist) {
          if (item.id === singleSong.id) {
            flag = true
            console.log(flag) // 判断是否为重复的歌,是的话直接播放
            this.$store.dispatch('playlist/getSongInfo', item)
          }
        }
        if (flag === false) {
        // 不是重复的歌。将其添加至歌单列表首位playSingleSong
          this.$store.commit('isShowPlayer') // 打开播放器
          this.$store.commit('isPlayed') // 播放过音乐 mini播放器 常驻显示
          this.$store.dispatch('playlist/playSingleSong', { singleSong })
        }
      }
    },
    // 播放全部音乐
    playAll (songs) {
      let songsId = []
      for (let item of songs) {
        songsId.push(item.id)
      }
      this.$store.commit('isShowPlayer') // 打开播放器
      this.$store.commit('isPlayed') // 播放过音乐 mini播放器 常驻显示
      this.$store.dispatch('playlist/playAllSong', { songsId })
    }
  },
  mounted () {
    this.getCompositedata(this.keyword, '1018')
  }
}
</script>

<style lang="less" scoped>

.SearchAll {
  height: 100vh;
  overflow: scroll;
  padding-bottom: 10px;
  background: #f5f5f5;
  .list_div{
    margin: 14px 10px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    /** 整体加+song部分 */
    .s_title{
      height: 40px;
      width: 340px;
      font-size: 17px;
      font-weight: bold;
      color: black;
      padding: 16px 20px 4px;
      position: relative;
    }
    .r-title-word{
      color: #333333;
      border: 1px #e6e6e6 solid;
      border-radius: 12px;
      height: 20px;
      line-height: 20px;
      position: absolute;
      top: 14px;
      right: 0px;
      display: inline-table;
    }
    .r-title-word a {
        font-size: 12px;
        display: inline-table;
        display: table-cell;
        padding: 1px 8px 0px 10px;
    }
    .r-title-word a span{
      display: table-cell;
      font-size: 12px;
    }
    .r-title-word .iconfont{
      padding-right: 2px;
    }
    .s_more{
      font-size: 13px;
      color: #adadad;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-bofang{
      display: flex;
      align-items: center;
    }
    .item-bofang .icon-bofang1{
      font-size: 22px;
      height: 24px;
      width: 24px;
      padding-right: 8px;
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
    /** 专辑部分 */
    .album_list{
      .album_item {
        margin-top: 6px;
        display: flex;
        align-items: center;
        height: 60px;
        position: relative;
        .album_pic {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          overflow: hidden;
          margin-left: 10px;
          .bg {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #000;
            position: absolute;
            top: 0px;
            border: 1px solid white;
          }
          .album_img {
            width: 50px;
            height: 50px;
          }
        }
        .album_info {
          width: 300px;
          padding-left: 10px;
          .album_name {
            font-size: 14px;
            color: #000;
          }
          .album_by {
            color: #969799;
            margin-top: 6px;
            font-size: 10px;
          }
        }
      }
    }
    /** 歌单部分 */
    .playlist_item {
      height: 60px;
      padding: 2px 11px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .i_pic {
        width: 50px;
        height: 50px;
        border-radius: 6px;
        overflow: hidden;
        img{
          width: 50px;
          height: 50px;
        }
      }
      .i_info {
        width: 270px;
        .name {
          font-size: 14px;
          color: #333;
        }
        .count {
          margin-top: 3px;
          font-size: 10px;
          color: #969799;
        }
      }
    }
    /** 歌手部分 */
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
    /** 视频部分 */
    .video_item{
      display: flex;
      margin: 10px 5px;
      height: 70px;
      .video_img{
        width: 120px;
        border-radius: 10px;
        position: relative;
        .i_pic{
          width: 120px;
          border-radius: 10px;
          overflow: hidden;
        }
        .iconfont{
          position: absolute;
          left: 50%; top: 50%;
          color: #fff;
          opacity: 0.7;
          font-size: 24px;
          transform: translate(-50%, -50%)
        }
      }
      .i_info{
        vertical-align: -webkit-baseline-middle;
        width: 240px;
        padding: 8px 10px 9px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .name{
          font-size: 16px;
        }
        .video_info{
          color: #adadad;
          font-size: 12px;
          display: flex;
          align-items: center;
          span{
            font-size: 12px;
          }
        }
      }
    }
    /** 用户 */
    .user_item {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-left: 10px;
      .avatar {
        width: 46px;
        height: 46px;
        position: relative;
        .pic {
          width: 44px;
          height: 44px;
        }
        .identity {
          position: absolute;
          width: 14px;
          height: 14px;
          bottom: 0;
          margin-bottom: 2px;
          left: 30px;
        }
      }
      .info {
        width: 220px;
        .i_name {
          display: flex;
          align-items: center;
          .name {
            font-size: 15px;
          }
          .sex1 {
            font-size: 12px;
            margin-left: 6px;
            color: #f78698;
          }
          .sex2 {
            font-size: 12px;
            margin-left: 6px;
            color: #8a86f7;
          }
        }
        .i_signature {
          font-size: 10px;
          color: #969799;
          margin-top: 4px;
        }
      }
      .follow {
        width: 70px;
        .btn1 {
          width: 64px;
          height: 24px;
          font-size: 11.6px;
          color: #ff3a3a;
          border: 1px solid #ff3a3a;
          border-radius: 15px;
          text-align: center;
          line-height: 24px;
        }
        .btn2 {
          width: 60px;
          height: 22px;
          font-size: 12px;
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
}
</style>
