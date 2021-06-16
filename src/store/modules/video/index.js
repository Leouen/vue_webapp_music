import Vue from 'vue'
import { getMVUrl } from 'network/video'

const user = {
  namespaced: true,

  state: {
    currentId: '',
    currentUrl: '',
    isMv: false
  },

  getters: {
  },

  mutations: {
    setCurrentId: (state, id) => {
      state.currentId = id
    },
    setCurrentUrl: (state, url) => {
      state.currentUrl = url
    }
  },

  actions: {
    getUrl ({ commit, state, dispatch }, isMv) {
      if (isMv) {
        getMVUrl(state.currentId).then(res => {
          console.log(res)
          commit('setCurrentUrl', res.data.url)
        })
      }
    }
  }
}

export default user
