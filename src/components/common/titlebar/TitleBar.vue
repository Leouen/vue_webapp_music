<template>
  <div class="titlebar">
      <div class="left l-title">{{titles.left}}</div>
      <div class="right r-title">
        <div class="r-title-word"><a class="iconfont">{{titles.right}}&#xe660;</a></div>
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
  margin: 10px 0 0 15px;
  color: black;
  font-weight: 600;
}
.r-title{
  margin-right: 15px;
}
.r-title .r-title-word{
  color: #333333;
  border: 1px #e6e6e6 solid;
  border-radius: 11px;
  margin-top: 8.5px;
  height: 20px;
  line-height: 20px;
}
.r-title-word {
    display: inline-table;
}
.r-title-word a {
    font-size: 13px;
    display: table-cell;
    padding: 1px 6px 1px 10px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
