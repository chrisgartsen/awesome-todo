const state = {
  tasks: {
    'ID1': { name: 'Wash Car', completed: false, dueDate: '2019/05/18', dueTime: '18:30' },
    'ID2': { name: 'Buy Groceries', completed: false, dueDate: '2019/04/11', dueTime: '17:30' },
    'ID3': { name: 'Get bananas', completed: false, dueDate: '2019/06/20', dueTime: '15:00' },
  }
}

const getters = {
  tasks(state) {
    return state.tasks
  }
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  }
}

const actions = {
  updateTask({commit}, payload) {
    commit('updateTask', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}