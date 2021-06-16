import { playSong, getlyric, getSongDetial } from 'network/playmusic'

const playlist = {
  namespaced: true,
  state: {
    audio: {},
    current: {
      album: '',
      albumId: '',
      author: [],
      id: '',
      name: '',
      lyric: '',
      src: '',
      picUrl: ''
    },
    currentIndex: 0,
    // 目前播放器播放音乐信息
    currentSec: 0,
    currentTotalSec: 0,
    currentRate: 0,
    currentValue: 0,
    currentVolume: 0.3,
    audioDom: null,
    playlist: [],
    playing: false,
    // 1循环 2随机 3单曲
    mode: 1,
    // 当前倍速
    modeRate: 2,
    // 当前轮播封面显示
    isActive: true,
    fullscreen: false
  },

  getters: {
    playlist: state => state.playlist,
    currentIndex: state => state.currentIndex,
    mode: state => state.mode,
    playing: state => state.playing,
    current: state => state.current
  },

  mutations: {

    initAudio: (state, audioDom) => {
      state.audioDom = audioDom
    },

    updateCurrent: (state, song) => {
      state.current = Object.assign(state.current, song)
    },

    setCurrentLyric: (state, lyric) => {
      state.current.lyric = lyric
    },

    setCurrentSrc: (state, src) => {
      state.current.src = src
    },

    setCurrentIndex: (state, idx) => {
      state.currentIndex = idx
    },

    setCurrentVolume: (state, Volume) => {
      state.currentVolume = Volume
    },

    setPlaylist: (state, list) => {
      state.playlist = Object.assign(state.playlist, list)
    },
    removeListItem: (state, index) => {
      state.playlist.splice(index, 1)
    },
    setCurrentSec: (state, currentSec) => {
      state.currentSec = currentSec
    },

    setCurrentTotalSec: (state, currentTotalSec) => {
      state.currentTotalSec = currentTotalSec
      state.currentRate = state.currentTotalSec / 100
    },

    setCurrentValue: (state) => {
      state.currentValue = state.currentSec / state.currentRate
    },

    setAudio: (state, audio) => {
      state.audio = audio
    },
    setMode: (state, mode) => {
      state.mode = mode
    },

    swichModeRate: (state, mode) => {
      state.modeRate = mode
    },

    setIsActive: (state) => {
      state.isActive = !state.isActive
    },

    setPlaying: (state) => {
      state.playing = !state.playing
    },

    setPlayingFalse: (state) => {
      state.playing = false
    },

    setPlayingTrue: (state) => {
      state.playing = true
    },

    setFullscreen: (state, flg) => {
      state.fullscreen = flg
    }
  },

  actions: {
    // 获得歌曲的信息，并且播放音乐
    getSongInfo ({ commit, state, dispatch }, current) {
      playSong(current.id).then((res) => {
        // console.log(res)
        var musicUrl = res.data[0].url
        commit('setCurrentSrc', musicUrl)
        commit('updateCurrent', current)
      })
      getlyric(current.id).then((res) => {
        if (res.lrc) {
          // console.log(res.lrc.lyric)
          // 处理歌词，转化成key为时间，value为歌词的对象
          let lyricArr = res.lrc.lyric.split('[').slice(1) // 先以[进行分割
          let lrcObj = {}
          lyricArr.forEach(item => {
            let arr = item.split(']') // 再分割右括号
            // 时间换算成秒
            let m = parseInt(arr[0].split(':')[0])
            let s = parseInt(arr[0].split(':')[1])
            arr[0] = m * 60 + s
            if (arr[1] !== '\n') { // 去除歌词中的换行符
              lrcObj[arr[0]] = arr[1]
            }
          })
          // 存储数据
          commit('setCurrentLyric', lrcObj)
          // console.log(lrcObj)
        }
      })
    },
    // 页面----歌单内---点击播放
    // current 当前歌曲的信息 songlist 整个歌单数组 index 当前音乐下标
    selectPlaylist: ({ commit, state, dispatch }, { current, songList, index }) => {
      commit('setPlaylist', songList) // 设置正在播放的歌单
      commit('setCurrentIndex', index) // 设置正在播放的下标
      dispatch('getSongInfo', current)
    },

    backSong ({ commit, state, dispatch }) {
      if (state.mode === 1 || state.mode === 3) {
      // 目前的歌单下标 ！= 歌单的长度
        if (state.currentIndex !== 0) {
          let index = state.currentIndex
          index -= 1
          commit('setCurrentIndex', index) // 设置正在播放的下标
          let current = state.playlist[index]
          dispatch('getSongInfo', current) // 播放音乐
        } else {
          let index = state.playlist.length - 1
          commit('setCurrentIndex', index) // 设置正在播放的下标
          let current = state.playlist[index]
          dispatch('getSongInfo', current) // 播放音乐
        }
      } else if (state.mode === 2) {
        let index = state.currentIndex
        index = Math.round(Math.random() * (state.playlist.length - 1))
        commit('setCurrentIndex', index) // 设置正在播放的下标
        let current = state.playlist[index]
        dispatch('getSongInfo', current) // 播放音乐
      }
    },

    nextSong ({ commit, state, dispatch }) {
      if (state.mode === 1 || state.mode === 3) {
        // 目前的歌单下标 ！= 歌单的长度
        if (state.currentIndex !== state.playlist.length - 1) {
          let index = state.currentIndex
          index += 1
          commit('setCurrentIndex', index) // 设置正在播放的下标
          let current = state.playlist[index]
          dispatch('getSongInfo', current) // 播放音乐
        } else {
          let index = 0
          commit('setCurrentIndex', index) // 设置正在播放的下标
          let current = state.playlist[index]
          dispatch('getSongInfo', current) // 播放音乐
        }
      } else if (state.mode === 2) {
        let index = state.currentIndex
        index = Math.round(Math.random() * (state.playlist.length - 1))
        commit('setCurrentIndex', index) // 设置正在播放的下标
        let current = state.playlist[index]
        dispatch('getSongInfo', current) // 播放音乐
      }
    },
    async playSingleSong ({ commit, state, dispatch }, { singleSong }) {
      await getSongDetial(singleSong.id).then((res) => {
        for (const item of res.songs) {
        // 选择性保存数据
          state.playlist.unshift({
            songName: item.name,
            id: item.id,
            author: item.ar,
            picUrl: item.al.picUrl,
            mvId: item.mv,
            album: item.al.name,
            albumId: item.al.id,
            alia: item.alia,
            quality: item.h
          })
        }
      })
      dispatch('getSongInfo', state.playlist[0])
    },
    async playAllSong ({ commit, state, dispatch }, { songsId }) {
      await getSongDetial(songsId.toString()).then((res) => {
        // 清空歌单
        state.playlist = []
        for (const item of res.songs) {
        // 选择性保存数据
          state.playlist.push({
            songName: item.name,
            id: item.id,
            author: item.ar,
            picUrl: item.al.picUrl,
            mvId: item.mv,
            album: item.al.name,
            albumId: item.al.id,
            alia: item.alia,
            quality: item.h
          })
        }
      })
      dispatch('getSongInfo', state.playlist[0])
    }
  }
}

export default playlist
// songUrl({ id })
// .then(res => {
//   const { code, data } = res
//   if (code === 200) {
//     const src = data[0].url
//     commit('setCurrentSrc', src)
//     resolve(state.current)
//   } else {
//     console.log('获取播放地址失败')
//     reject(new Error())
//   }
// })
// .catch(() => { reject(new Error()) })
