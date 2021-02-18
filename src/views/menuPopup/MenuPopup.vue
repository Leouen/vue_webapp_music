<template>
  <div class="MenuPopup">
    <van-popup v-model="show" position="left" :style="{ width: '82%' }">
        <div class="PopupNav">
            <router-link class="PopupNavLeft" to="/UserLogin">
              <div class="UserImg">
                <img class="UserImg" src="~assets/img/ProfileBox/user.svg" alt="">
              </div>
              <span class="PopupNavText">立即登陆</span>
              <span class="iconfont icon-daohangyou"></span>
            </router-link>
            <div class="PopupNavRight">
              <span class="iconfont icon-saoma"></span>
            </div>
        </div>
        <div class="NavContent">
          <div class="NavCell">
            <van-cell-group>
              <van-cell title="我的消息" is-link title-class='NavSpIcon'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-xinfeng "></span>
                </template>
              </van-cell>
              <van-cell title="云贝中心" is-link>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-yun "></span>
                </template>
              </van-cell>
              <van-cell title="创作者中心" is-link>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-bulb "></span>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
          <div class="NavCell">
            <van-cell-group title="音乐服务">
              <van-cell title="云村有票" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-piao "></span>
                </template>
              </van-cell>
              <van-cell title="商城" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-gouwuche "></span>
                </template>
              </van-cell>
              <van-cell title="游戏专区" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-game "></span>
                </template>
              </van-cell>
              <van-cell title="口袋彩铃" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-ls "></span>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
          <div class="NavCell">
            <van-cell-group title="其他">
              <van-cell title="设置" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-shezhi "></span>
                </template>
              </van-cell>
              <van-cell title="夜间模式" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-yejian "></span>
                </template>
                <template #right-icon>
                  <van-switch v-model="checked" size="22px" inactive-color="#dcdee0" />
                </template>
              </van-cell>
              <van-cell title="定时关闭" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-timer "></span>
                </template>
              </van-cell>
              <van-cell title="个性装扮" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-yifu1 "></span>
                </template>
              </van-cell>
              <van-cell title="边听边存" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-icon-test "></span>
                </template>
              </van-cell>
              <van-cell title="在线听歌免流量" is-link :border='border' value="未开启">
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-liuliangqianbao "></span>
                </template>
              </van-cell>
              <van-cell title="音乐黑名单" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-jinzhi "></span>
                </template>
              </van-cell>
              <van-cell title="青少年模式" is-link :border='border' value="未开启">
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-dunpai "></span>
                </template>
              </van-cell>
              <van-cell title="音乐闹钟" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-naozhong "></span>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
          <div class="NavCell">
            <van-cell-group>
              <van-cell title="我的订单" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-dingdan "></span>
                </template>
              </van-cell>
              <van-cell title="优惠券" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-youhuiquan "></span>
                </template>
              </van-cell>
              <van-cell title="帮助与反馈" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-caishichang- "></span>
                </template>
              </van-cell>
              <van-cell title="分享网易云" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-fenxiang "></span>
                </template>
              </van-cell>
              <van-cell title="关于" is-link :border='border'>
                <template #icon>
                  <span class="iconfont PopupNavIcon icon-gy "></span>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
          <div class="NavCell exit">关闭网易云</div>
        </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'MenuPopup',
  data () {
    return {
      show: false,
      fixed: true,
      border: false,
      checked: false
    }
  },
  mounted () {
    this.$Bus.$on('openPopup', () => {
      this.show = true
    })
  }
}
</script>

<style>
.PopupNav{
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.PopupNavLeft{
  flex: 1;
  display: flex;
  align-items: center;
}
.UserImg{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
}
.UserImg>img{
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #f1ecec;
}
.icon-tx{
  font-size: 26px;
  margin-left: 10px;
  color: #f9d9d9;
}
.PopupNavText{
  padding: 0 6px;
  font-size: 16px;
  color: #353535;
}
.PopupNavLeft>.icon-daohangyou{
  font-size: 18px;
  color: #333333;
}

.PopupNavRight{
  width: 40px;
  display: flex;
  align-items: center;
}
.PopupNavRight .icon-saoma{
  font-size: 18px;
  color: #333333;
  font-weight: bold;
}

.NavCell{
  margin: 0px 12px 12px 12px;
  border-radius: 12px;
  background: white;
  overflow: hidden;
}
.NavCell.exit{
  text-align: center;
  color: #ff4646;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.PopupNavIcon{
  padding-bottom: 1.5px;
  padding-right: 5px;
}
.van-cell {
  display: flex;
  align-items: center;
}
.van-cell__value{
  font-size: 10px;
}
</style>
