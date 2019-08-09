<template>
  <q-page class="q-pa-md">
    <q-list bordered separator>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key"> </task>
    </q-list>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'
import task from '../components/tasks/task'

export default {
  name: 'page-todo',
  computed: {
    ...mapGetters('tasks', ['tasks']) 
  },
  components: {
    task
  }
}
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>