<template>
  <div class="row q-mb-sm">
    <q-input :value="name" 
             @input="$emit('update:name', $event)"
             class="col" 
             label="Name" 
             v-select-all
             :rules="[val => !!val || 'Name is required']" 
             v-autofocus 
             clearable
             outlined />
  </div>
</template>

<script>
import { selectAll } from 'src/utils/directive-select-all'
import { autofocus } from 'src/utils/directive-autofocus'

export default {
  name: 'modal-task-name',
  props: {
    name: {
      required: true
    }
  },
  directives: {
    selectAll,
    autofocus
  }
}
</script>
