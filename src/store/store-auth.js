import { firebaseAuth } from 'boot/firebase'
import { dispatch } from 'C:/Users/Chris Gartsen/AppData/Local/Microsoft/TypeScript/3.5/node_modules/rxjs/internal/observable/range';

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
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password) 
      .then(response => {
        console.log("Login", response)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  logoutUser({commit}) {
    firebaseAuth.signOut()
  },
  registerUser({commit}, payload) {
    console.log(payload)
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log("Register", response)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  handleAuthStateChange({commit, dispatch}) {
    firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        commit('setLoggedIn', true)
        dispatch('tasks/fbReadData', null, {
          root: true
        } )
        this.$router.push('/')
      } else {
        commit('setLoggedIn', false)
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