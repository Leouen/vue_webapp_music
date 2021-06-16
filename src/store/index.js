import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user/index'
import playlist from './modules/playlist/index'
import video from './modules/video/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlayed: false, // 是否播放过了音乐
    isShowPlayer: false, // 是否展示播放器界面
    isShowPlaylist: false, // 是否展示歌单界面
    isShowComment: false, // 是否展示评论界面
    isShowVideo: false, // 是否展示视频播放器界面
    sheetId: '', // 目前所在的歌单id
    commentId: '', // 通过该id 获取评论 /可能是音乐 歌单 视频的id
    commentIdType: 0, // 通过该评论类型 取数据 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
    commentInfo: {
      album: '',
      albumId: '',
      author: [],
      id: '',
      name: '',
      src: '',
      picUrl: ''
    }
  },
  mutations: {
    isPlayed (state) {
      state.isPlayed = true
    },
    isShowPlayer (state) {
      state.isShowPlayer = !state.isShowPlayer
    },
    isShowPlaylist (state) {
      state.isShowPlaylist = !state.isShowPlaylist
    },
    isShowComment (state) {
      state.isShowComment = !state.isShowComment
    },
    isShowVideo (state) {
      state.isShowVideo = !state.isShowVideo
    },
    changeSheetId (state, newID) {
      state.sheetId = newID
    },
    setCommentId (state, { id, type, info }) {
      state.commentId = id
      // console.log(id)
      state.commentIdType = type
      // console.log(type)
      state.commentInfo = Object.assign(state.commentInfo, info)
      // console.log(info)
    }
  },
  actions: { },
  modules: {
    user,
    playlist,
    video
  },
  getters: {}
})
