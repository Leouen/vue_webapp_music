import { songUrl } from '@/network/song'

const playlist = {
  namespaced: true,

  state: {
    plid: null,
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
    audioDom: null,
    playlist: [],
    playing: false,
    // 1顺序 2随机 3单曲
    mode: 1,
    fullscreen: false
  },

  getters: {
    plid: state => state.plid,
    playlist: state => state.playlist,
    currentIndex: state => state.currentIndex,
    mode: state => state.mode,
    playing: state => state.playing,
    current: state => state.current
  },

  mutations: {
    setPlid: (state, plid) => {
      state.plid = plid
    },

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
    setPlaylist: (state, list) => {
      state.playlist = list
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
    // 歌单内点击播放
    selectPlaylist: ({ commit, state, dispatch }, { id, index, list }) => {
      // console.log('selectplaylist', id, state.plid)
      // 如果歌单 id 不相等
      if (id !== state.plid) {
        commit('setPlid', id)
        commit('setPlaylist', list)
      }
      dispatch('selectSong', index)
    },

    // 获取当前歌曲信息及 src
    getCurrentSong: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        const { currentIndex, playlist } = state
        const { id, name, al: album, ar: singer } = playlist[currentIndex]

        commit('updateCurrent', { id, name, album, singer })

        songUrl({ id })
          .then(res => {
            const { code, data } = res
            if (code === 200) {
              const src = data[0].url
              commit('setCurrentSrc', src)
              resolve(state.current)
            } else {
              console.log('获取播放地址失败')
              reject(new Error())
            }
          })
          .catch(() => { reject(new Error()) })
      })
    },

    // 点击歌单内单曲
    selectSong: ({ commit, state, dispatch }, index) => {
      // console.log('selectsong', index, state.currentIndex)
      if (index !== state.currentIndex) {
        commit('setPlaying', false)
        commit('setCurrentIndex', index)

        dispatch('getCurrentSong')
          .then(() => {
            commit('setPlaying', true)
          })
      }
    },

    nextSong: () => {

    },

    prevSong: () => {

    }
  }
}

export default playlist
