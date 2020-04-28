import axios from '@/axios.js'

const state = {
  users:[]
}


// Getter functions
const getters = {
//
}


// Actions
const actions = {
  fetchAllUsers({ commit },payload=null) {

    return new Promise((resolve, reject) => {
      axios.get('/users', {
        params: payload,
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          commit('SET_USERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUser (context, userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/users/${userId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
// Mutations
const mutations = {
  SET_USERS(state, data) {
    state.users = data;
  },

}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
