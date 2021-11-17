<template>
  <div>
    <music-sheet-bottom :songList="songList" :songCount="songCount" :privileges="privileges" v-if="songList"></music-sheet-bottom>
  </div>
</template>

<script>
import MusicSheetBottom from '../musicList/childCpn/MusicSheetBottom.vue'
import { getDailySheet } from 'network/musicList'
export default {
  components: { MusicSheetBottom },
  data (){
    return {
      songList:[],
      songCount:0,
      privileges:[]
    }
  },
  methods: {
    getSheet(){
      getDailySheet().then(res=>{
        console.log(res);
        this.songList = res.recommend
        this.songCount = 20
      })
    }
  },
  created(){
    this.getSheet()
  }
}
</script>

<style>

</style>