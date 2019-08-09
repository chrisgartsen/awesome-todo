<template>
  <q-page class="q-pa-md">
    <q-list bordered separator>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key"> </task>
    </q-list>

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
import task from '../components/tasks/task'
import taskForm from '../components/tasks/task-form'

export default {
  name: 'page-todo',
  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks']) 
  },
  components: {
    task,
    taskForm
  }
}
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>