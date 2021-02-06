<template>
  <div class="HomeSlideBall">
    <div class="mui-content" style="">
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <a class="mui-control-item" v-for="(item,index) in balls" :key="index">
              <div class="img">
                <img :src="item.iconUrl" alt="" />
              </div>
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mui from 'assets/mui/js/mui.min.js'
import { getBall } from 'network/home'

mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
})

export default {
  name: 'HomeSlideBall',
  data () {
    return {
      balls: []
    }
  },
  mounted () {
    mui('.mui-scroll-wrapper').scroll({
      bounce: true, // 是否回弹
      scrollY: false, // 是否竖向滚动
      scrollX: true, // 是否横向滚动
      startX: 0, // 初始化时滚动至x
      startY: 0, // 初始化时滚动至y
      indicators: true // 是否显示滚动条
    })
  },
  created () {
    getBall().then(res => {
      this.balls = res.data
      console.log(res)
      // console.log(res.banners[0].imageUrl)
      // .HomeSlideBall,.mui-content,#slider,#sliderSegmentedControl,.mui-scroll,.mui-control-item
    })
  }
}
</script>

<style>
#slider {
  background: white;
  height: 82px;
}
.mui-control-item {
  padding: 16px 15px 16px 20px !important;
  text-align: center;
  font-size: 10px;
}
#sliderSegmentedControl{
  height: 100%;
}

.mui-control-item{
  padding: 0 10px;
  height: 100%;
}
.mui-control-item .img img{
  width: 40px ;
  height: 40px ;
  display: block;
  background:linear-gradient(45deg, red, #fdd5d5);
  border-radius: 50%;
  margin-bottom: -8px;
}
.mui-segmented-control .mui-control-item{
  overflow: visible !important;
}
</style>
