<template>
  <div class="row q-mb-sm">
    <q-input :value="name" 
             @input="$emit('update:name', $event)"
             class="col" 
             label="Name" 
             v-select-all
             :rules="[val => !!val || 'Name is required']" 
             autofocus 
             clearable
             outlined />
  </div>
</template>

<script>
import { selectAll } from 'src/utils/directive-select-all'

export default {
  name: 'modal-task-name',
  props: {
    name: {
      required: true
    }
  },
  directives: {
    selectAll
  }
}
</script>
