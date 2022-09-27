import { login } from '@/api/user'
const state = {
  userInfo: {},
  timestart: ''
}

const mutations = {
  SET_TOKEN(state, userInfo) {
    state.userInfo = userInfo
  },
  DEL_USERINFO(state) {
    state.userInfo = {}
  },
  SET_TIME(state) {
    state.timestart = +new Date()
  }
}

const actions = {
  async loginAction({ commit }, loginData) {
    const { data } = await login(loginData)
    console.log(data)
    commit('SET_TOKEN', data)
    commit('SET_TIME')
  },
  logout({ commit }) {
    commit('DEL_USERINFO')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

