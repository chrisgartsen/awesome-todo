<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search />
      <sort/>
    </div>

    <q-banner class="bg-grey-3 no-tasks" v-if="showNoTasksFound">No tasks found.</q-banner>

    <no-tasks v-if="showNoTasks"/>
    <tasks-todo :tasks="tasksTodo" class="q-mt-lg"/>
    <tasks-completed :tasks="tasksCompleted" class="q-mt-lg" />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn round size="24px" icon="add" color="primary" @click="showDialog = true"></q-btn>
    </div>

    <q-dialog v-model="showDialog">
      <task-form @close="showDialog = false"/>
    </q-dialog>
 
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import taskForm from '../components/tasks/add-task-form'
import tasksTodo from '../components/tasks/tasks-todo'
import tasksCompleted from '../components/tasks/tasks-completed'
import noTasks from '../components/tasks/no-tasks'
import search from '../components/tasks/search'
import sort from '../components/tasks/sort'

export default {
  name: 'page-todo',
  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted', 'search']),
    showNoTasks() {
      return !Object.keys(this.tasksTodo).length && !this.search
    },
    showNoTasksFound() {
      return this.search && !Object.keys(this.tasksTodo).length && !Object.keys(this.tasksCompleted).length
    }
  },
  components: {
    taskForm,
    tasksTodo,
    tasksCompleted,
    noTasks,
    search,
    sort
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showDialog = true
    })
  }
}
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>