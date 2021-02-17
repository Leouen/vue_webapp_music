<template>
  <div class="Profile">
    <profile-bar></profile-bar>
    <profile-login></profile-login>
    <profile-box></profile-box>
    <profile-love></profile-love>
  </div>
</template>

<script>
import ProfileBar from './childCpns/ProfileBar.vue'
import ProfileBox from './childCpns/ProfileBox.vue'
import ProfileLogin from './childCpns/ProfileLogin.vue'
import ProfileLove from './childCpns/ProfileLove.vue'
export default {
  name: 'Profile',
  components: { ProfileBar, ProfileLogin, ProfileBox, ProfileLove }
}
</script>

<style scoped>
.Profile{
  height: 900px;
  background: #f5f5f5;
}
</style>
