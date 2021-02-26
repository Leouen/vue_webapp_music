<template>
  <div id="Karaoke">
    <van-button type="primary" @click="isShowPlayer">测试打开音乐播放器</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-form >
       <van-field name="用户名" label="用户名" placeholder="请输入用户名"  :rules="[{ required: true, message: '请填写用户名'}]"/>
       <van-field type="password" name="密码" label="密码" placeholder="请输入密码"  :rules="[{ required: true, message: '请填写密码'}]"/>
       <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
       </div>
    </van-form>
    <div id="demo">
      <button v-on:click="show = !show">
        Toggle
      </button>
      <transition name="van-slide-up">
        <p v-if="show">hello</p>
      </transition>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Karaoke',
  data () {
    return {
      show: true
    }
  },
  components: {
  },
  methods: {
    isShowPlayer () {
      this.$store.commit('isShowPlayer')
    }
  }
}
</script>

<style scoped>
#Karaoke{
  height: 1000px;
  width: 100%;
  background: #fff;
}
</style>
