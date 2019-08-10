<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <modal-header>Edit task</modal-header>
      <q-card-section>
        <modal-task-name :name.sync="editTask.name" />
        <modal-task-duedate :dueDate.sync="editTask.dueDate" />
        <modal-task-duetime :dueTime.sync="editTask.dueTime" v-if="editTask.dueDate" />
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
  props: {
    task: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },  
  data() {
    return {
      editTask: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    onSubmit() {
      this.updateTask({ id: this.id, updates: this.editTask })
      this.$emit('close')
    }
  },
  mounted() {
    this.editTask = Object.assign({}, this.task)
  }
}
</script>