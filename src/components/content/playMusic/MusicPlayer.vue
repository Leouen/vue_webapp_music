<template>
  <div id="MusicPlayer">
    <audio autoplay :src="$store.state.playlist.current.src"></audio>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer'
}
</script>

<style>

</style>
