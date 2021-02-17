<template>
  <div class="titlebar">
      <div class="left l-title">{{titles.left}}</div>
      <div class="right r-title">
        <div class="r-title-word"><a class=""><span>{{titles.right}}</span><span class="iconfont icon-daohangyou"></span></a></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    titles: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
.titlebar{
  height: 40px;
}
.l-title{
  font-size: 16px;
  margin: 10px 0 0 18px;
  color: black;
  font-weight: 600;
}
.r-title{
  display: flex;
  margin-top: 3px;
  margin-right: 15px;
}
.r-title-word{
  color: #333333;
  border: 1px #e6e6e6 solid;
  border-radius: 12px;
  margin-top: 2.5px;
  height: 20px;
  line-height: 20px;
  display: inline-table;
}
.r-title-word a {
    font-size: 12px;
    display: inline-table;
    display: table-cell;
    padding: 2px 6px 1px 10px;
}
.r-title-word a span{
  display: table-cell;
}
.icon-daohangyou{
  font-size: 12px;
}
</style>
