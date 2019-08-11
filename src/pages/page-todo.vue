<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search />
    </div>

    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length ">
      No tasks found.
    </p>

    <no-tasks v-if="!Object.keys(tasksTodo).length && !search"/>
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

<style>
</style>

<script>
import { mapGetters } from 'vuex'

import taskForm from '../components/tasks/add-task-form'
import tasksTodo from '../components/tasks/tasks-todo'
import tasksCompleted from '../components/tasks/tasks-completed'
import noTasks from '../components/tasks/no-tasks'
import search from '../components/tasks/search'

export default {
  name: 'page-todo',
  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted', 'search']) 
  },
  components: {
    taskForm,
    tasksTodo,
    tasksCompleted,
    noTasks,
    search
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