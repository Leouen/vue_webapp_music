import Vue from 'vue'
import { phoneLogin, mailLogin, logout } from '@/network/login'

const user = {
  namespaced: true,

  state: {
    token: '',
    account: {},
    bindings: {},
    info: {
      userId: ''
    }
  },

  getters: {
    token: state => state.token,
    userId: state => state.info.userId,
    userInfo: state => state.info
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_BINDINGS: (state, bindings) => {
      state.bindings = bindings
    },
    SET_INFO: (state, info) => {
      state.info = info
      state.userId = info.userId
      Vue.ls.set('userInfo', info)
    }
  },

  actions: {
    phoneLogin ({ commit }, params) {
      return new Promise((resolve, reject) => {
        phoneLogin(params)
          .then(res => {
            const { code, token, account, bindings, profile } = res
            if (code === 200) {
              commit('SET_TOKEN', token)
              commit('SET_ACCOUNT', account)
              commit('SET_BINDINGS', bindings)
              commit('SET_INFO', profile)
            }
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    mailLogin ({ commit }, params) {
      return new Promise((resolve, reject) => {
        mailLogin(params)
          .then(res => {
            const { code, token, account, bindings, profile } = res
            if (code === 200) {
              commit('SET_TOKEN', token)
              commit('SET_ACCOUNT', account)
              commit('SET_BINDINGS', bindings)
              commit('SET_INFO', profile)
            }
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => { })
      })
    }
  }
}

export default user
