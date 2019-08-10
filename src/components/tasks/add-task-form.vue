<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <modal-header>Add task</modal-header>
      <q-card-section>
        <modal-task-name :name.sync="task.name" />
        <modal-task-duedate :dueDate.sync="task.dueDate" />
        <modal-task-duetime :dueTime.sync="task.dueTime" v-if="task.dueDate" />
      </q-card-section>
      <modal-buttons/>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

import modalHeader from '../shared/modal-header'
import modalTaskName from '../shared/modal-task-name'
import modalTaskDuedate from '../shared/modal-task-duedate'
import modalTaskDuetime from '../shared/modal-task-duetime'
import modalButtons from '../shared/modal-buttons'

export default {
  name: 'add-task-form',
  components: {
    modalHeader,
    modalTaskName,
    modalTaskDuedate,
    modalTaskDuetime,
    modalButtons
  },
  data() {
    return {
      task: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['createTask']),
    onSubmit() {
      this.createTask(this.task)
      this.$emit('close')
    }
  }
}
</script>