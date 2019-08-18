import Vue from 'vue'
import { uid, Notify } from 'quasar'

import { firebaseDB, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/utils/function-show-error'

const state = {
  tasks: {},
  search: '',
  sort: 'name',
  tasksDownloaded: false
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
  },
  tasksDownloaded(state) {
    return state.tasksDownloaded
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
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

const actions = {
  async updateTask({}, payload) {
    try {
      const userId = firebaseAuth.currentUser.uid
      const ref = firebaseDB.ref('tasks/' + userId + '/' + payload.id)
      await ref.update(payload.updates)
      const keys = Object.keys(payload.updates)
      if(!(keys.includes('completed') && keys.length == 1)) Notify.create("Task updated")
    } catch (error) {
      showErrorMessage(error.message)
    }
  },
  async deleteTask({}, id) {
    try {
      const userId = firebaseAuth.currentUser.uid
      const ref = firebaseDB.ref('tasks/' + userId + '/' + id)
      await ref.remove()
      Notify.create("Task deleted")
    } catch(error) {
      showErrorMessage(error.message) 
    }
  },
  async createTask({}, task) {
    try {
      const userId = firebaseAuth.currentUser.uid
      const ref = firebaseDB.ref('tasks/' + userId + '/' + uid())
      await ref.set(task)
      Notify.create("Task added")
    } catch(error) {
      showErrorMessage(error.message)      
    }
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  },
  fbReadData({commit}) {
    const userTasks = firebaseDB.ref('tasks/' + firebaseAuth.currentUser.uid)
    
    userTasks.once('value', (snapshot) => {
      commit('setTasksDownloaded', true)
    }, (error) => {
      showErrorMessage(error.message)
    })

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