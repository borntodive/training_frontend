import axios from '@/axios.js'

const state = {
  certifications:[]
}


// Getter functions
const getters = {
//
}


// Actions
const actions = {
  fetchAllCertifications({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/certifications')
        .then((response) => {
          commit('SET_CERTIFICATIONS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  add ({ commit }, certification) {
    return new Promise((resolve, reject) => {
      axios.post('/certifications', {certification})
        .then((response) => {
          commit('ADD_CERTIFICATION', Object.assign(certification, {id: response.data.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  update ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.put(`/certifications/${data.certification.id}`, {
        certification:data.certification,
        teaching: data.teaching
      })
        .then((response) => {
          commit('UPDATE_CERTIFICATION', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
// Mutations
const mutations = {
  SET_CERTIFICATIONS(state, data) {
    state.certifications = data;
  },
  UPDATE_CERTIFICATION (state, certification) {

    const certificationIndex = state.certifications.data.findIndex((c) => c.id === certification.data.id)
    console.log(certificationIndex)
    Object.assign(state.certifications.data[certificationIndex], certification.data)
  },
  ADD_CERTIFICATION (state, item) {
    state.certifications.data.unshift(item)
  },

}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
