const state = {}

const mutations = {
  SET_USER: (state, payload) => {
    for (let key in payload) {
      state[key] = payload[key]
    }
  },
}

const actions = {
  // get user info
  getUserInfo({ commit }, data) {
    commit('SET_USER', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
