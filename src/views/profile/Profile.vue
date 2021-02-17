<template>
  <div class="Profile">
    <van-sticky>
       <profile-bar></profile-bar>
    </van-sticky>
    <profile-login></profile-login>
    <profile-box></profile-box>
    <profile-love></profile-love>
    <van-tabs class="profile-list-bar" v-model="active" scrollspy sticky offset-top='34px'>
      <van-tab title="创建歌单" title-style='z-index: 9; border-right: 1px solid #e2e2e2; font-weight: 600;' >
        <create-list></create-list>
      </van-tab>
      <van-tab title="收藏歌单" title-style='z-index: 9; font-weight: 600;'>
        <collect-list></collect-list>
      </van-tab>
    </van-tabs>
    <profile-rec></profile-rec>
  </div>
</template>

<script>
import CollectList from '../../components/content/musicList/CollectList.vue'
import CreateList from '../../components/content/musicList/CreateList.vue'
import ProfileBar from './childCpns/ProfileBar.vue'
import ProfileBox from './childCpns/ProfileBox.vue'
import ProfileLogin from './childCpns/ProfileLogin.vue'
import ProfileLove from './childCpns/ProfileLove.vue'
import ProfileRec from './childCpns/ProfileRec.vue'
export default {
  name: 'Profile',
  data () {
    return {
      active: 0
    }
  },
  components: { ProfileBar, ProfileLogin, ProfileBox, ProfileLove, CreateList, CollectList, ProfileRec },
  methods: {
  }
}
</script>

<style>
.Profile{
  background: #f5f5f5;
}
.profile-list-bar{
  padding: 12px 0px;
}
.van-tabs__line{
  bottom: 25px;
}
.van-tab{
  margin: 10px 0px;
}

</style>
