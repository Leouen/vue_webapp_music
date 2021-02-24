<template>
  <div class="PodcastDjBanner">
    <swiper class="my-swipe swiper" :options="swiperOption" id="pa"  v-if="banners.length">
      <swiper-slide class="swiperItem" v-for="(item,index) in banners" :key="index">
        <a :href="item.url">
          <div class="img">
            <img :src="item.pic" alt="">
            <div class="img-title" :style='{background: "#f22a25"}'>{{item.typeTitle}}</div>
          </div>
        </a>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { getDjBanner } from 'network/podcast'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'PodcastDjBanner',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      banners: [],
      swiperOption: {
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        spaceBetween: 80,
        // 循环
        loop: true,
        // 每张播放时长3秒，自动播放
        autoplay: {
          delay: 3000 // 3秒切换一次
        },
        // 滑动速度
        speed: 500,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  created () {
    getDjBanner().then(res => {
      this.banners = res.data
    })
  }
}
</script>

<style>
.my-swipe{
    padding: 14px 20px 0px;
    width: 100%;
    overflow: hidden;
    margin: 0 auto 80px;
    position: relative;
}
.swiperItem img{
    display: block;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: relative;
}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
  bottom: 3px;
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
  margin: 0 2px;
}
.swiper-pagination-bullet {
  width: 10px;
  height: 2px;
  border-radius: 2px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color:#000;
  opacity: 1;
  background: rgba(0,0,0,0.2);
}
.swiper-pagination-bullet-active {
  color:#fff;
  background: #fff;
}
.img-title{
  position: absolute;
  padding: 2.5px 7px 2.5px;
  border-top-left-radius: 6px;
  border-bottom-right-radius: 8px;
  font-size: 10px;
  text-align: center;
  bottom: 0;
  right: 0;
  color: #fff;
}
</style>
