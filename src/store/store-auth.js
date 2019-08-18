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
  async loginUser({}, payload) {
    Loading.show()
    try {
      await firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password) 
    } catch(error) {
      showErrorMessage(error.message)
    } finally {
      Loading.hide()
    }
  },
  logoutUser({}) {
    firebaseAuth.signOut()
  },
  async registerUser({}, payload) {
    Loading.show()
    try {
      await firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      console.log('Created user', firebaseAuth.currentUser.email)
    } catch (error) {
      showErrorMessage(error.message)
    } finally {
      Loading.hide()
    }
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
        commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        commit('tasks/clearTasks', null, { root: true })
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