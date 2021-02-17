<template>
  <div class="SheetItem">
    <div class="SheetItemImg">
      <img :src="sheet.picUrl?sheet.picUrl:sheet.coverImgUrl" alt="">
      <div><span class="iconfont icon-bofang-tongyong"></span>{{count}}</div>
    </div>
    <div class="SheetItemText">{{sheet.name}}</div>
  </div>
</template>

<script>
import { toStringNum } from '@/common/utils'
export default {
  name: 'SheetItem',
  props: {
    sheet: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      count: null
    }
  },
  created () {
    this.count = toStringNum(this.sheet.playCount ? this.sheet.playCount : this.sheet.program.adjustedPlayCount)
  }
}
</script>
<style scoped>
.SheetItem{
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
}
.SheetItemImg{
  text-align: center;
  position: relative;
}
.SheetItemImg>img{
  width: 90%;
  border-radius: 12px;
  box-shadow: 0px -9px 0px -5px #f2f2f2;
}
.SheetItemImg>div{
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 10px;
  color: white;
  background-color: rgba(100, 100, 100, 0.4);
  padding: 1px 5px;
  border-radius: 10px;
  white-space:nowrap;
}
.SheetItemImg>div>span{
  font-size: 9px;
  padding-right: 2px;
}
.SheetItemText{
  font-size: 10px;
  color: #000;
  height: 28px;
  line-height: 15px;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制在一个块元素显示的文本的行数 */
  -webkit-box-orient: vertical; /* 垂直排列 */
}
</style>
