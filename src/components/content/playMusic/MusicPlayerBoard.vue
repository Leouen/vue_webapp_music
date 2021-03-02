<template>
  <div class="play-board">
    <img id="needle" class="play-needle pause-needle" :class="{resumeNeedle: $store.state.playlist.playing}" src="~assets/img/playmusic/play_needle.png"/>
    <div class="disk-bg"></div>
    <div class="disk-cover disk-cover-animation" :class="{animePause: !$store.state.playlist.playing}">
        <img class="disk-border" src="~assets/img/playmusic/play_disc.png"/>
        <img class="album" src="~assets/img/playmusic/test.jpg"/>
        <img class="album" style="display: none" src="~assets/img/playmusic/placeholder_disk_play_song.png"/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.play-board {
    position: absolute;
    overflow: hidden;
    top: 8%;
    width: 100%;
    height: 82%;
    color: white;
}

.play-needle {
    position: absolute;
    top: 0px;
    left: 49.5%;
    margin: 0px -12px;
    z-index: 10;
    width: 100px;
    transform-origin: 20px 20px;
    transition: transform 0.4s;
    -webkit-transform-origin: 20px 20px;
    -webkit-transition: -webkit-transform 0.4s;
}

.pause-needle {
    transform: rotateZ(-25deg);
    -webkit-transform: rotateZ(-25deg);
}

.resumeNeedle {
    transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
}

.disk-cover {
    width: 280px;
    height: 280px;
    position: absolute;
    left: 50%;
    top: 98px;
    margin: 0% -140px;
}

.disk-cover-animation {
    animation: rotate-disk 20s infinite normal linear;
}
.animePause{
  animation-play-state: paused;
}
@keyframes rotate-disk {
    100% {
        transform: rotateZ(360deg);
    }
}

@-webkit-keyframes rotate-disk {
    100% {
        -webkit-transform: rotateZ(360deg);
    }
}
.disk-transition {
    transition: left 0.8s ease-in-out;
    -webkit-transition: left 0.8s ease-in-out;
}

.disk-cover img {
    display: block;
    width: 100%;
}

.disk-cover .album {
    width: 68%;
    margin: 16%;
    border-radius: 50%;
}

.disk-cover .disk-border {
    position: absolute;
    top: 0px;
}
</style>
