<template>
  <div v-if="Object.keys(tasks).length">
    <list-header headerColor="bg-green-4">Completed</list-header>
    <q-list bordered separator>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key" > </task>
    </q-list>
  </div>
</template>

<script>
import task from './task'
import listHeader from '../shared/list-header'

export default {
  name: 'tasks-completed',
  props: {
    tasks: {
      required: true
    }
  },
  components: {
    task,
    listHeader
  }
}
</script>