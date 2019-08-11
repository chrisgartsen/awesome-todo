import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    'ID1': { name: 'Wash Car', completed: false, dueDate: '2019/05/18', dueTime: '18:30' },
    'ID2': { name: 'Buy Groceries', completed: false, dueDate: '2019/04/11', dueTime: '17:30' },
    'ID3': { name: 'Get bananas', completed: false, dueDate: '2019/06/20', dueTime: '15:00' },
  },
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
    const taskId = uid()
    const payload = {
      id: taskId,
      task: task
    }
    commit('createTask', payload)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}