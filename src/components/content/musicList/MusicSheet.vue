<template>
  <div class="MusicSheet">
    <music-sheet-top :playlist="playlist" v-if="playlist"></music-sheet-top>
    <music-sheet-bottom :songList="songList" :songCount="songCount" :privileges="privileges" v-if="songList"></music-sheet-bottom>
  </div>
</template>

<script>
import { getlistDetial } from 'network/musicList'
import { getSongDetial } from 'network/playmusic'
import MusicSheetTop from './childCpn/MusicSheetTop.vue'
import MusicSheetBottom from './childCpn/MusicSheetBottom.vue'
export default {
  name: 'MusicSheet',
  components: { MusicSheetTop, MusicSheetBottom },
  data () {
    return {
      // 歌单信息
      playlist: {
        id: null,
        name: null,
        coverImgUrl: null,
        playCount: null,
        commentCount: null,
        shareCount: null,
        subscribedCount: null,
        description: null,
        creator: {
          nickname: null,
          avatarUrl: null,
          avatarDetail: {}
        }
      },
      songList: [], // 音乐信息
      songListId: [], // 歌单歌曲id
      privileges: [],
      songCount: 0 // 歌曲数量

    }
  },
  created () {
    this.changeSheetId(this.$route.params.id)
    getlistDetial(this.$route.params.id).then((res) => {
      // 歌单信息
      const { id, name, coverImgUrl, playCount, commentCount, shareCount, subscribedCount, description, creator: { nickname, avatarDetail, avatarUrl } } = res.playlist
      this.playlist = { id, name, coverImgUrl, playCount, commentCount, shareCount, subscribedCount, description, creator: { nickname, avatarDetail, avatarUrl } }

      // 获得完整歌单ID
      for (const item of res.playlist.trackIds) {
        this.songListId.push(item.id)
        this.songCount++
      }
      // 歌单中曲目信息
      getSongDetial(this.songListId.toString()).then((res) => {
        for (const item of res.songs) {
        // 选择性保存数据
          this.songList.push({
            songName: item.name,
            id: item.id,
            author: item.ar,
            mvId: item.mv,
            album: item.al.name,
            albumId: item.al.id,
            alia: item.alia,
            quality: item.h
          })
        }
        for (const item of res.privileges) {
          this.privileges.push({
            flag: item.flag,
            playMaxbr: item.playMaxbr
          })
        }
        // console.log(res.privileges)
        // console.log(this.songList)
        // console.log(this.privileges)
      })
    })
  },
  mounted () {
    // this.ImgColor()
    // this.changeColor()
  },
  methods: {
    changeSheetId (newID) {
      this.$store.commit('changeSheetId', newID)
    }
  }
}
</script>

<style>
.MusicSheet{
  color: white;
  height: 1000px;
  background: #fff;
}
</style>
