<template>
  <div class="ProfileRec">
    <div class="ProfileRecTitle">
      <van-cell style="background: #f5f5f5;">
        <template #title>
          <span class="RecTitleText">为你推荐</span>
        </template>
        <template #right-icon>
          <img  src="~assets/img/ProfileBox/exit.svg" alt="">
        </template>
      </van-cell>
    </div>
    <div class="ProfileRecItem">
      <div v-for="(item,index) in sheets" :key="index">
        <sheet-item :sheet='item'></sheet-item>
      </div>
      <div class="ProfileMore">
        <div class="ProfileMoreWord">
          <a class="">
            <span>更多推荐歌单</span><span class="iconfont icon-daohangyou"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SheetItem from '../../../components/content/sheetItem/SheetItem.vue'
import { getHotSheet } from 'network/home'
export default {
  name: 'ProfileRec',
  data () {
    return {
      sheets: [],
      order: 'hot',
      cat: '全部',
      limit: 6,
      offset: 24
    }
  },
  components: { SheetItem },
  created () {
    getHotSheet(this.order, this.cat, this.limit, this.offset).then(res => {
      console.log(res)
      this.sheets = res.playlists
    })
  }
}
</script>

<style>
.ProfileRecTitle{
  height: 40px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
}
.RecTitleText{
  font-size: 19px;
  font-weight: bold;
  margin-left: 8px;
}
.ProfileRecTitle img{
  height: 36px;
  width: 36px;
  margin-right: 3px;
}
.ProfileRecItem{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 5px 12px 20px
}
.ProfileRecItem>div{
  flex: 33%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 5px -12px;
}
.ProfileMore{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 50px;
}
.ProfileMoreWord{
  color: #333333;
  border: 1px #d0d0d0 solid;
  border-radius: 16px;
  margin-top: 2.5px;
  height: 20px;
  line-height: 20px;
  display: inline-table;
}
.ProfileMoreWord a {
    font-size: 14px;
    display: inline-table;
    display: table-cell;
    padding: 5px 6px 4px 10px;
}
.ProfileMoreWord a span{
  display: table-cell;
}
.ProfileMoreWord .icon-daohangyou{
  font-size: 14px;
  font-weight: 100;
}
</style>
