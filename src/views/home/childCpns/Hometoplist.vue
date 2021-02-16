<template>
  <div class="Hometoplist">
    <swiper :options="swiperOption">
      <swiper-slide  v-for="(item,index) in topList" :key="index">
        <div class="top-item"><home-top-list-item :list='item'></home-top-list-item></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { getlistdetail } from 'network/home'
import HomeTopListItem from './HomeTopListItem.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    HomeTopListItem,
    Swiper,
    SwiperSlide
  },
  name: 'Hometoplist',
  data () {
    return {
      topList: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: -50,
        preventLinksPropagation: false,
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  created () {
    getlistdetail().then((res) => {
      let path = res.list
      for (let i = 0; i < 4; i++) {
        this.topList.push({
          id: path[i].id, // 榜单id
          name: path[i].name // 榜单名称
        })
      }
      // console.log(this.topList)
    })
  }
}
</script>

<style>
.Hometoplist{
  border-bottom: 10px solid #f5f5f5;
}

</style>
