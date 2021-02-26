<template>
  <div class="MusicSheet">
    <music-sheet-top :sheet="playlist"></music-sheet-top>
  </div>
</template>

<script>
import { getlistDetial } from 'network/musicList'
import MusicSheetTop from './childCpn/MusicSheetTop.vue'
export default {
  name: 'MusicSheet',
  components: { MusicSheetTop },
  data () {
    return {
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
          avatarDetail: {}
        }
      } // 歌单信息
    }
  },
  created () {
    this.changeSheetId(this.$route.params.id)
    getlistDetial(this.$route.params.id).then((res) => {
      this.playlist.id = res.playlist.id
      this.playlist.name = res.playlist.name
      this.playlist.coverImgUrl = res.playlist.coverImgUrl
      this.playlist.playCount = res.playlist.playCount
      this.playlist.commentCount = res.playlist.commentCount
      this.playlist.shareCount = res.playlist.shareCount
      this.playlist.subscribedCount = res.playlist.subscribedCount
      this.playlist.description = res.playlist.description
      this.playlist.creator.nickname = res.playlist.creator.nickname
      this.playlist.creator.avatarDetail = res.playlist.creator.avatarDetail
    })
  },
  mounted () {
  },
  methods: {
    changeSheetId (newID) {
      this.$store.commit('changeSheetId', newID)
    }
  }
}
</script>

<style>

</style>
