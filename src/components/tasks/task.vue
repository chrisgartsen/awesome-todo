<template>
  <q-item v-ripple clickable @click="updateTask({id: id, updates: {completed: !task.completed}})" :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'" v-touch-hold:1000.mouse="showTask">
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{'text-strikethrough' : task.completed}" v-html="$options.filters.searchHighLight(task.name, search)"></q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs"/>
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{ task.dueDate | formatDate }}</q-item-label>
          <q-item-label caption class="row justify-end"><small>{{ task.dueTime }}</small></q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn flat round dense color="primary" icon="edit"    @click.stop="showTask"/>
        <q-btn flat round dense color="negative" icon="delete" @click.stop="promptDelete(id)"/>
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task-form @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script>
import { date } from 'quasar'
const { formatDate } = date

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import editTaskForm from '../../components/tasks/edit-task-form'

export default {
  name: 'task',
  components: {
    editTaskForm
  },
  props: {
    task: {
      required: true
    },
    id: {
      required: true
    }
  },
  data() {
    return {
      showEditTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['search'])
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptDelete(id) {
      this.$q.dialog({
        title:'Confirm',
        message: "Really delete this task?",
        ok: {
          flat: true
        },
        cancel: {
          flat: true,
          color: 'negative'
        }
      }).onOk(() => this.deleteTask(id))
    },
    showTask() {
      this.showEditTask = true
    }
  },
  filters: {
    formatDate(value) {
      return formatDate(value, 'D MMM YYYY')
    },
    searchHighLight(value, search) {
      if(search) {
        const regEx = new RegExp(search, 'ig')
        return value.replace(regEx, (match) => {
          return '<span class="bg-yellow-6">' + match + '</span>'
        })
      }
      return value
    }
  }
}
</script>