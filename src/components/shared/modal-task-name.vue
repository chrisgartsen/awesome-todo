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
export default {
  name: 'modal-task-name',
  props: {
    name: {
      required: true
    }
  },
  directives: {
    selectAll: {
      inserted(el) {
        const input = el.querySelector('.q-field__native')
        input.addEventListener('focus', () =>{
          if(input.value.length) input.select()
        })
      }
    }
  }
}
</script>
