<template>
    <div class="HomeSwiper">
      <Swiper class="my-swipe swiper" :options="swiperOption" id="pa"  v-if="banners.length">
        <SwiperSlide class="swiperItem" v-for="(item,index) in banners" :key="index">
            <div class="img">
              <img :src="item.imageUrl" alt="">
              <div class="title" :style='{background:item.titleColor === "blue" ? "#326ef8" : item.titleColor}'>{{item.typeTitle}}</div>
            </div>
        </SwiperSlide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </Swiper>
    </div>
</template>

<script>

import { getBanner } from 'network/home'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'HomeSwiper',
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
    getBanner().then(res => {
      this.banners = res.banners
      // console.log(res)
      // console.log(res.banners[0].imageUrl)
    })
  }
}
</script>

<style scoped>
    .HomeSwiper{
        background: linear-gradient(#ececec,white);
    }
    .my-swipe{
        padding: 14px 20px 0px;
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
        position: relative;
    }
    .swiperItem img{
        display: block;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        position: relative;
    }

    #pa /deep/ .swiper-pagination-bullet {
      width: 12px;
      height: 4px;
      border-radius: 2px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      color:#000;
      opacity: 1;
      background: rgba(0,0,0,0.2);
    }
    #pa /deep/ .swiper-pagination-bullet-active {
      color:#fff;
      background: #fff;
    }
    .title{
      position: absolute;
      padding: 0px 7px 0px;
      border-top-left-radius: 8px;
      border-bottom-right-radius: 8px;
      font-size: 10px;
      text-align: center;
      bottom: 0;
      right: 0;
      color: #fff;
    }
</style>
