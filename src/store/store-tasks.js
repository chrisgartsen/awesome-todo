import Vue from 'vue'
import { uid } from 'quasar'

import { firebaseDB, firebaseAuth } from 'boot/firebase'

const state = {
  tasks: {},
  search: '',
  sort: 'name'
}

const getters = {
  tasksSorted(state) {
    const tasksSorted = {}
    const keysOrdered = Object.keys(state.tasks)

    keysOrdered.sort((a,b) =>{
      const taskAProp = state.tasks[a][state.sort].toLowerCase()
      const taskBProp = state.tasks[b][state.sort].toLowerCase()
      if(taskAProp > taskBProp) return 1
      if(taskAProp < taskBProp) return -1
      return 0
    })

    keysOrdered.forEach((key) => tasksSorted[key] = state.tasks[key])

    return tasksSorted
  },
  tasksFiltered(state, getters) {
    const tasksFiltered = {}
    const tasksSorted = getters.tasksSorted

    if(state.search) {
      Object.keys(tasksSorted).forEach((key) => {
        const task = tasksSorted[key]
        if(task.name.toLowerCase().includes(state.search.toLowerCase())) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    } else {
      return tasksSorted
    }
  },
  tasksTodo(state, getters) {
    const tasks = {}
    const tasksFiltered = getters.tasksFiltered
    Object.keys(tasksFiltered).forEach((key) => {
      const task = tasksFiltered[key]
      if(!task.completed) tasks[key] = task
    })
    return tasks
  },
  tasksCompleted(state, getters) {
    const tasks = {}
    const tasksFiltered = getters.tasksFiltered
    Object.keys(tasksFiltered).forEach((key) => {
      const task = tasksFiltered[key]
      if(task.completed) tasks[key] = task
    })
    return tasks
  },   
  search(state) {
    return state.search
  },
  sort(state) {
    return state.sort
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
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
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
    commit('createTask', { id: uid(), task: task })
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  },
  fbReadData({commit}) {
    const userTasks = firebaseDB.ref('tasks/' + firebaseAuth.currentUser.uid)
    
    userTasks.on('child_added', (snapshot) => {
      const task = snapshot.val()
      commit('createTask', { id: snapshot.key, task: task })
    })

    userTasks.on('child_changed', (snapshot) => {
      const task = snapshot.val() 
      commit('updateTask', { id: snapshot.key, updates: task })
    })

    userTasks.on('child_removed', (snapshot) => {
      commit('deleteTask', snapshot.key)
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