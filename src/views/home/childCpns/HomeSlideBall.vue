<template>
  <div class="HomeSlideBall">
    <swiper class="wrapper" :options="swiperOption">
      <swiper-slide class="content" v-for="(item,index) in balls" :key="index">
        <a class="balls-control-item" >
          <div class="ball-img">
            <img :src="item.iconUrl" alt="" />
          </div>
          <div class="ball-text">{{item.name}}</div>
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { getBall } from 'network/home'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'HomeSlideBall',
  data () {
    return {
      balls: [],
      swiperOption: {
        // freeMode: true,
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
  },
  created () {
    getBall().then(res => {
      this.balls = res.data
      // console.log(res)
    })
  }
}
</script>

<style>

.wrapper{
  height: 90px;
  width: 100%;
  overflow: hidden;
  border-bottom: 0.3px solid #e6e6e6;
  margin-bottom: 5px;
}
.content {
  display: flex;
}
.balls-control-item{
  flex: 1;
  padding: 16px 0px 10px;
}
.balls-control-item .ball-img img{
  width: 40px ;
  height: 40px ;
  display: block;
  background:linear-gradient(45deg, red, #fdd5d5);
  border-radius: 50%;
  margin: 0 auto;
}
.ball-text{
  font-size: 12px;
  padding-top: 6px;
  text-align: center;
  white-space:nowrap;
}
</style>
