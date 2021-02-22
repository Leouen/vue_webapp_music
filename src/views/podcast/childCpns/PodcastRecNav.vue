<template>
  <div class="PodcastRecNav">
    <swiper class="wrapper" :options="swiperOption">
      <swiper-slide class="content">
        <a class="RecNavItem" >
          <div class="RecNavImg">
            <img src="~assets/img/podcast/1.png" alt="" />
          </div>
          <div class="RecNavText">排行榜</div>
        </a>
      </swiper-slide>
      <swiper-slide class="content">
        <a class="RecNavItem" >
          <div class="RecNavImg">
            <img src="~assets/img/podcast/2.png" alt="" />
          </div>
          <div class="RecNavText">新人必听</div>
        </a>
      </swiper-slide>
      <swiper-slide class="content">
        <a class="RecNavItem" >
          <div class="RecNavImg">
            <img src="~assets/img/podcast/3.png" alt="" />
          </div>
          <div class="RecNavText">广播电台</div>
        </a>
      </swiper-slide>
      <swiper-slide class="content">
        <a class="RecNavItem" >
          <div class="RecNavImg">
            <img src="~assets/img/podcast/4.png" alt="" />
          </div>
          <div class="RecNavText">有声剧场</div>
        </a>
      </swiper-slide>
      <swiper-slide class="content">
        <a class="RecNavItem" >
          <div class="RecNavImg">
            <img src="~assets/img/podcast/5.png" alt="" />
          </div>
          <div class="RecNavText">宝藏播客</div>
        </a>
      </swiper-slide>
      <swiper-slide class="content">
        <a class="RecNavItem" >
          <div class="RecNavImg">
            <img src="~assets/img/podcast/6.png" alt="" />
          </div>
          <div class="RecNavText">有奖征集</div>
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'PodcastRecNav',
  data () {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: -10,
        preventLinksPropagation: false, // 拖动Swiper时阻止click事件,如果没有禁止拖动需要设置此项
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style>
.PodcastRecNav{
  margin: 16px 0;
}
.RecNavItem{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.RecNavImg img{
 width: 60px;
}
.RecNavText{
  font-size: 10px;
}
</style>
