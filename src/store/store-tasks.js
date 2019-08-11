import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    'ID1': { name: 'Wash Car', completed: false, dueDate: '2019/05/18', dueTime: '18:30' },
    'ID2': { name: 'Buy Groceries', completed: false, dueDate: '2019/04/11', dueTime: '17:30' },
    'ID3': { name: 'Get bananas', completed: false, dueDate: '2019/06/20', dueTime: '15:00' },
  }
}

const getters = {
  tasksTodo(state) {
    const tasks = {}
    Object.keys(state.tasks).forEach((key) => {
      const task = state.tasks[key]
      if(!task.completed) tasks[key] = task
    })
    return tasks
  } ,
  tasksCompleted(state) {
    const tasks = {}
    Object.keys(state.tasks).forEach((key) => {
      const task = state.tasks[key]
      if(task.completed) tasks[key] = task
    })
    return tasks
  }   
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  createTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  }
}

const actions = {
  updateTask({commit}, payload) {
    commit('updateTask', payload)
  },
  deleteTask({commit}, id) {
    commit('deleteTask', id)
  },
  createTask({commit}, task) {
    const taskId = uid()
    const payload = {
      id: taskId,
      task: task
    }
    commit('createTask', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}