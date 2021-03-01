<template>
  <div class="loader1">
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
    <div class="line4"></div>
  </div>
</template>

<script>
export default {
  name: 'loader1'
}
</script>

<style>

.loader1 {
  position: relative;
  width: 30px;
  height: 22px;
  z-index: 2;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}
.loader1>div{
  flex: 1;;
  margin: 0px 2px;
  border-radius: 5px;
  background: red;
}
.loader1 .line1 {
  animation: line-grow 0.4s 0.1s ease alternate infinite;
}
.loader1 .line2 {
  animation: line-grow 0.4s 0.4s ease alternate infinite;
}
.loader1 .line3 {
  animation: line-grow 0.4s 0.3s ease alternate infinite;
}
.loader1 .line4 {
  animation: line-grow 0.4s 0.5s ease alternate infinite;
}
@keyframes line-grow {
  0% {
    height: 0;
  }
  100% {
    height: 75%;
  }
}
</style>
