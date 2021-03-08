<template>
  <navbar class="HomeNavBar">
    <div id="HomeNavLeft" slot="left" class="iconfont icon-caidan" @click="MenuPopup"></div>
    <div id="HomeNavCenter" slot="center" >
      <div class="NavSearch" @click='toSearch'>
        <span class="iconfont icon-sousuo"></span>
        <span class="hotsearch">{{defultWorld}}</span>
      </div>
    </div>
    <div id="HomeNavRight" slot="right" class="iconfont icon-CombinedShape"></div>
  </navbar>
</template>

<script>
import { _getDefaultHotKey } from 'network/search'
import navbar from '@/components/common/navbar/navbar'
export default {
  name: 'HomeNavBar',
  data () {
    return {
      defultWorld: null
    }
  },
  components: {
    navbar
  },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    },
    toSearch () {
      this.$router.push('/search')
    }
  },
  created () {
    _getDefaultHotKey().then(res => {
      // console.log(res)
      this.defultWorld = res.data.showKeyword
    })
  }
}
</script>

<style>
#HomeNavLeft,#HomeNavRight{
  font-size: 22px;
  color: #333333;
}
#HomeNavCenter{
  height: 30px;
  margin: 5px auto;
  border-radius: 20px;
  background-color: #fdfdfd;
  line-height: 30px;
  text-align: left ;
  padding-left: 16px;
  color: #989898;
}
#HomeNavCenter span{
  vertical-align: middle;
  font-size: 16px;
}
#HomeNavCenter>.NavSearch{
  display: flex;
  align-items: center;
}
#HomeNavCenter>.NavSearch>.icon-sousuo{
  font-size: 22px ;
}
#HomeNavCenter>.NavSearch>.hotsearch{
  font-size: 14px ;
  margin-top: 1.5px;

}
</style>
