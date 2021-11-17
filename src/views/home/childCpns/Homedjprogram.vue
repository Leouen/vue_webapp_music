<template>
<div class="HomeSheet">
  <swiper class="wrapper-sheet" :options="swiperOption">
    <swiper-slide class="content-sheet" v-for="(item,index) in sheets" :key="index">
      <div @click="toSheet(item.id)">
        <sheet-item class="sheet-control-item" :sheet='item'></sheet-item>
      </div>
    </swiper-slide>
  </swiper>
</div>
</template>

<script>
import SheetItem from 'components/content/sheetItem/SheetItem.vue'
import {
  Swiper,
  SwiperSlide
} from 'vue-awesome-swiper'
import {
  getdjprogram
} from 'network/home'
import 'swiper/css/swiper.css'
export default {
  name: 'HomeSheet',
  data() {
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
  created() {
    getdjprogram(6).then(res => {
      this.sheets = res.result
      // console.log(res)
    })
  },
  methods: {
    toSheet(id) {
      this.$router.push('/musicSheet/' + id + '&' + false)
    },
  }
}
</script>

<style>
.wrapper-sheet {
  display: flex;
  align-content: space-around;
  padding-left: 8px;
}
</style>
