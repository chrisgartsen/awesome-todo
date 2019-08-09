<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="row">
        <div class="text-h6">Add Task</div>
        <q-space/>
        <q-btn flat round dense icon="close" v-close-popup></q-btn>
      </q-card-section>
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input outlined v-model="task.name" class="col" label="Name" :rules="[val => !!val || 'Name is required']" autofocus clearable />
        </div>
        <div class="row q-mb-sm">
          <q-input outlined v-model="task.dueDate" label="Due date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="task.dueDate" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row q-mb-sm" v-if="task.dueDate">
          <q-input outlined v-model="task.dueTime" label="Due time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy>
                  <q-time v-model="task.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" type="submit">Save</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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