<template>
    <div id="app">
      <navbar>
        <div slot="left" class="iconfont icon-fanhui" @click="goBack"></div>
        <div slot="right" class="iconfont icon-fenxiang1" @click="goBack"></div>
      </navbar>
      <d-player ref="player" id="player" :options="options"></d-player>
    </div>
</template>
<script>
import navbar from 'components/common/navbar/navbar.vue'
import { getMVDetail } from 'network/video'
export default {
  data () {
    return {
      player: null,
      options: {
        container: document.getElementById('dplayer'), // 播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: '#b7daff', // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: 'zh-cn', // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: 'auto', // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], // 可选的播放速度，可自定义
        // logo: 'https://qczh-1252727916.cos.ap-nanjing.myqcloud.com/pic/273658f508d04d488414fd2b84c9f923.png', // 在视频左上角上打一个logo
        video: {
          url: this.$store.state.video.currentUrl // 播放视频的路径
          // quality: [
          //   // 设置多个质量的视频
          //   {
          //     name: '高清',
          //     url:
          //       'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          //     type: 'auto' // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
          //   },
          //   {
          //     name: '标清',
          //     url:
          //       'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          //     type: 'auto'
          //   }
          // ],
          // defaultQuality: 0, // 默认是高清
          // pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg', // 视频封面图片
          // thumbnails: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg' // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        },
        // subtitle: {
        //   //字幕
        //   url: "", //字幕网址
        //   color: "#fff", //字幕颜色
        //   fontSize: "20px",
        //   bottom: "40px"
        // },
        // danmaku: {
        //   // 弹幕
        //   id: '9E2E3368B56CDBB4',
        //   api: 'https://api.prprpr.me/dplayer/',
        //   token: 'tokendemo', // 后端验证令牌
        //   maximum: 1000, // 弹幕最大数量
        //   addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'], // 其他弹幕
        //   user: 'DIYgod', // 弹幕用户名
        //   bottom: '15%', // 值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
        //   unlimited: true // 即使弹幕重叠也显示所有弹幕
        // },
        // contextmenu: [
        //   //  自定义上下文菜单
        //   // 右键菜单
        //   {
        //     text: 'b站',
        //     link: 'https://www.bilibili.com'
        //   },
        //   {
        //     text: '选项二',
        //     click: player => {
        //       console.log(player)
        //     }
        //   }
        // ],
        highlight: [
          // 进度条上的自定义时间标记
          // 进度条时间点高亮
          {
            text: '10M',
            time: 6
          },
          {
            text: '20M',
            time: 12
          }
        ]
      }
    }
  },
  components: { navbar },
  mounted () {
    this.player = this.$refs.player.dp
    getMVDetail(this.$store.state.video.currentId).then(res => {
      console.log(res)
    })
  },
  methods: {
    // 设置视频播放路径
    _setVideoUrl (url) {
      this.player.switchVideo({
        url: url
      })
    },
    goBack () {
      this.$store.commit('isShowVideo')
    },
    play () {
      this.$refs.VueAliplayerV2.play()
    },

    pause () {
      this.$refs.VueAliplayerV2.pause()
    },

    replay () {
      this.$refs.VueAliplayerV2.replay()
    },

    getCurrentTime () {
      console.log(this.$refs.VueAliplayerV2.getCurrentTime())
      // this.source = 'http://ivi.bupt.edu.cn/hls/cctv1.m3u8'
    },

    getStatus () {
      const status = this.$refs.VueAliplayerV2.getStatus()
      console.log('getStatus:', status)
      alert(`getStatus:${status}`)
    },

    showMultiple () {
      this.isShowMultiple = !this.isShowMultiple
    }
  },
  computed: {
    returnUrl () {
      return this.$store.state.video.currentUrl
    }
  },
  watch: {
    returnUrl: {
      handler (val) {
        this._setVideoUrl(val)
        // this.options.video.url = val 无效的
        console.log(this.options.video.url)
        console.log(this.$store.state.video.currentUrl)
      }
    }
  }
}
</script>
<style lang="less">

.iconfont.icon-fanhui{
  font-size: 22px;
}
.iconfont.icon-fenxiang1{
  font-size: 20px;
}
.remove-text{
    text-align: center;
    padding: 20px;
    font-size: 24px;
}
.show-multiple{
    display: flex;
    .multiple-player{
        width: calc(100% / 4);
        margin: 20px;
    }
}
.player-btns{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    span {
        margin: 0 auto;
        display: inline-block;
        padding: 5px 10px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #eee;
        background: #e1e1e1;
        border-radius: 10px;
        text-align: center;
        margin: 5px;
        cursor: pointer;
    }
}
.source-box{
    padding: 5px 10px;
    margin-bottom: 20px;
    .source-label{
        margin-right: 20px;
        font-size: 16px;
        display: block;
    }
    #source{
        margin-top: 10px;
    }
    .source-input{
        margin-top: 10px;
        padding: 5px 10px;
        width: 80%;
        border: 1px solid #ccc;
    }
}
</style>
