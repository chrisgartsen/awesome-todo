import { firebaseAuth } from 'boot/firebase'
import { LocalStorage, Loading } from 'quasar'

import { showErrorMessage } from 'src/utils/function-show-error'

const state = {
  loggedIn: false
}

const getters = {
  isLoggedIn(state) {
    return state.loggedIn
  }
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  loginUser({commit}, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password) 
      .then(response => {
        Loading.hide()
        console.log("Login", response)
      })
      .catch(error => {
        Loading.hide()
        showErrorMessage(error.message)
        console.log(error.message)
      })
  },
  logoutUser({commit}) {
    firebaseAuth.signOut()
  },
  registerUser({commit}, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        Loading.hide()
        console.log("Register", response)
      })
      .catch(error => {
        Loading.hide()
        showErrorMessage(error.message)
        console.log(error.message)
      })
  },
  handleAuthStateChange({commit, dispatch}) {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide()
      if(user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedin', true)
        dispatch('tasks/fbReadData', null, { root: true })
        this.$router.push('/')
      } else {
        commit('setLoggedIn', false)
        LocalStorage.set('loggedin', false)
        this.$router.replace('/auth')
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}