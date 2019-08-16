import { LocalStorage } from 'quasar'

const state = {
  settings: {
    show12HourTimeFormat: false,
    showTasksInOneList: false
  }
}

const getters = {
  settings(state) {
    return state.settings
  }
}

const mutations = {
  setShow12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value
  }
}

const actions = {
  setShow12HourTimeFormat({commit, dispatch}, value) {
    commit('setShow12HourTimeFormat', value)
    dispatch('saveSettings')
  },
  setShowTasksInOneList({commit, dispatch}, value) {
    commit('setShowTasksInOneList', value)
    dispatch('saveSettings')
  },
  saveSettings({state}) {
    LocalStorage.set('settings', state.settings)
  },
  loadSettings({commit}) {
    const settings = LocalStorage.getItem('settings')
    if(settings) {
      commit('setShow12HourTimeFormat', settings.show12HourTimeFormat)
      commit('setShowTasksInOneList', settings.showTasksInOneList)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}