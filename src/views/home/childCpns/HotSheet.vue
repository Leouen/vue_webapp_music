<template>
  <div class="HotSheet">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in songList" :key="index">
        <hot-sheet-item :itemDetail="item"></hot-sheet-item>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import HotSheetItem from './HotSheetItem.vue'
import { getSongsTop } from 'network/home'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'HotSheet',
  components: {
    HotSheetItem,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      songList: [[], [], [], []], // 歌曲数组  二维数组嵌套
      swiperOption: {
        // freeMode: true,
        slidesPerView: 1,
        spaceBetween: -40,
        preventLinksPropagation: false,
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  created () {
    // 获取新歌
    getSongsTop(0).then((res) => {
      let path = res.data
      let k = 0
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          this.songList[i].push({
            id: path[k].id, // 歌曲id
            picUrl: path[k].album.picUrl, // 歌曲封面
            name: path[k].name, // 歌曲名称
            artists: path[k].artists[0].name // 演唱者
          })
          k++
        }
      }
    })
  }
}
</script>

<style>
.HotSheet{
  padding-bottom: 6px;
  border-bottom: 10px solid #f5f5f5;
}
</style>
