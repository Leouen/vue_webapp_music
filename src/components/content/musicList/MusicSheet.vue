<template>
  <div class="MusicSheet">
    <navbar>
      <div slot="left" class="iconfont icon-fanhui"></div>
      <div class="SheetCenter" slot="center">歌单<span class="iconfont icon-shangbiao"></span></div>
      <div slot="right" class="SheetRight">
        <span class="iconfont icon-sousuo1"></span>
        <span class="iconfont icon-ziyuan"></span>
      </div>
    </navbar>
    11121231
  </div>
</template>

<script>
import navbar from '../../common/navbar/navbar.vue'
import { getlistDetial } from 'network/musicList'
export default {
  components: { navbar },
  name: 'MusicSheet',
  created () {
    this.changeSheetId(this.$route.params.id)
    getlistDetial(this.$route.params.id).then((res) => {
      console.log(res)
    })
  },
  methods: {
    changeSheetId (newID) {
      this.$store.commit('changeSheetId', newID)
    }
  }
}
</script>

<style>
.MusicSheet .icon-fanhui{
  font-size: 20px;
}
.SheetRight{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.MusicSheet .icon-sousuo1{
  position: absolute;
  right: 54px;
}
.MusicSheet .icon-ziyuan{
  padding-right: 12px;
  font-size: 18px;
}
.MusicSheet .SheetCenter{
  text-align: start;
  font-size: 16px;
}
.MusicSheet .icon-shangbiao{
  font-size: 11PX;
  position: absolute;
  top: -4.5px;
}
</style>
