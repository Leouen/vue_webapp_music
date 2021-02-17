<template>
  <div class="nav-bar">
    <!-- 具名插槽 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  /* box-shadow: 0 1px 5px rgba(0,0,0,0.2); */
}

.left,
.right {
  width: 56px;
}

.center {
  /* flex为1的时候 会自动调整宽度 */
  flex: 1;
}
.nav-bar {
  /* background: linear-gradient(#e1e1e1,#f5f5f5); */
  background: #f5f5f5
}
</style>
