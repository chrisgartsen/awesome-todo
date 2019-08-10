<template>
  <div class="row q-mb-sm">
    <q-input :value="name" 
             @input="$emit('update:name', $event)"
             class="col" 
             label="Name" 
             :rules="[val => !!val || 'Name is required']" 
             autofocus 
             clearable
             outlined />
  </div>
</template>

<script>
export default {
  name: 'modal-task-name',
  props: {
    name: {
      required: true
    }
  },
}
</script>
