<template>
  <div class="PodcastDjRecSlider">
    <swiper class="wrapper-sheet" :options="swiperOption">
      <swiper-slide class="content-sheet" v-for="(item,index) in sheets" :key="index">
        <a href="#"><sheet-item class="sheet-control-item" :sheet='item' :showRcmdText="true"></sheet-item></a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import SheetItem from 'components/content/sheetItem/SheetItem.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { getDjRec } from 'network/podcast'
export default {
  name: 'PodcastDjRecSlider',
  data () {
    return {
      sheets: [],
      swiperOption: {
        // freeMode: true,
        slidesPerView: 3,
        spaceBetween: -18,
        preventLinksPropagation: false, // 拖动Swiper时阻止click事件,如果没有禁止拖动需要设置此项
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    SheetItem
  },
  created () {
    getDjRec().then(res => {
      this.sheets = res.djRadios
      // console.log(res)
    })
  }
}
</script>

<style>
.PodcastDjRecSlider{
  margin: 5px auto 10px;
}
.wrapper-sheet{
  display: flex;
  align-content: space-around;
  padding-left: 10px;
}
</style>
