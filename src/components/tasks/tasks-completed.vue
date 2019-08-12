<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div v-if="Object.keys(tasks).length">
      <list-header headerColor="bg-green-4" v-if="!settings.showTasksInOneList">Completed</list-header>
      <q-list bordered separator>
        <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key" > </task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import task from './task'
import listHeader from '../shared/list-header'

import { mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapGetters('settings', ['settings'])
  }
}
</script>