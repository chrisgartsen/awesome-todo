<template>
  <div class="row q-mb-sm">
    <q-input outlined :value="dueTime" label="Due time" @input="$emit('update:dueTime', $event)">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy>
            <q-time :value="dueTime" @input="$emit('update:dueTime', $event)"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'modal-task-duetime',
  props: {
    dueTime: {
      required: true
    }
  }
}
</script>

