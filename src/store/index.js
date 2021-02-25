import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlayed: false, // 是否播放过了音乐
    isShowPlayer: false, // 是否展示播放器界面
    sheetId: '' // 目前所在的歌单id
  },
  mutations: {
    isPlayed (state) {
      state.isPlayed = true
    },
    isShowPlayer (state) {
      state.isShowPlayer = true
    },
    changeSheetId (state, newID) {
      state.sheetId = newID
    }
  },
  actions: {
  },
  modules: {
  }
})
