<template>
  <q-banner class="bg-grey-3 no-tasks">
      <template v-slot:avatar>
        <q-icon name="check" color="primary"></q-icon>
      </template> 
      No Tasks to do today.
      <template v-slot:action>
        <q-btn flat color="primary" @click="$root.$emit('showAddTask')">Add task</q-btn>
      </template>
  </q-banner>  
</template>

<script>
export default {
  name: 'no-tasks'
}
</script>script

<style lang="scss">
  .no-tasks {
    border-radius: 5px;
  }
</style>