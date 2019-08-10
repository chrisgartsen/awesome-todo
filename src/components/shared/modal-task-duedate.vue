<template>
  <div class="row q-mb-sm">
    <q-input outlined :value="dueDate" label="Due date" @input="$emit('update:dueDate', $event)">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date :value="dueDate" @input="$emit('update:dueDate', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'modal-task-duedate',
  props: {
    dueDate: {
      required: true
    }
  }
}
</script>
