<template>
  <div class="HomeSlideBall">
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <a class="balls-control-item" v-for="(item,index) in balls" :key="index">
          <div class="ball-img">
            <img :src="item.iconUrl" alt="" />
          </div>
          <div class="ball-text">{{item.name}}</div>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBall } from 'network/home'
import BScroll from 'better-scroll'

export default {
  name: 'HomeSlideBall',
  data () {
    return {
      balls: [],
      scroll: null
    }
  },
  created () {
    getBall().then(res => {
      this.balls = res.data
      console.log(res)
    })
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      startX: 0,
      click: true,
      scrollX: true,
      // 忽略竖直方向的滚动
      scrollY: false,
      eventPassthrough: 'vertical',
      mouseWheel: true, // 开启鼠标滚轮
      disableMouse: false, // 启用鼠标拖动
      disableTouch: false, // 启用手指触摸
      pullUpLoad: true,
      pullDownRefresh: true
    })
  }
}
</script>

<style>

.wrapper{
  height: 90px;
  width: 100%;
  overflow: hidden;
}
.content {
  width: 600px;
  display: flex;
}
.balls-control-item{
  flex: 1;
  padding: 16px 14px 10px 18px;
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
  padding-top: 6px;
  text-align: center;
  white-space:nowrap;
}
</style>
