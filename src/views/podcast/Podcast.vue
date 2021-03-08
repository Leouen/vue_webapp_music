<template>
  <div class="profile" :class="{paddingBottom100:$store.state.isPlayed}">
    <podcast-bar></podcast-bar>
  </div>
</template>

<script>
import PodcastBar from './childCpns/PodcastBar.vue'
export default {
  components: { PodcastBar },
  name: 'Podcast'
}
</script>

<style scoped>
.profile{
  padding-bottom: 60px;
}
</style>
