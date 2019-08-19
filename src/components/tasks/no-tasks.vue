<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut absolute-top">
    <q-banner class="bg-grey-3 no-tasks">
        <template v-slot:avatar>
          <q-icon name="check" color="primary"></q-icon>
        </template> 
        No Tasks todo today.
        <template v-slot:action>
          <q-btn flat color="primary" @click="$root.$emit('showAddTask')">Add task</q-btn>
        </template>
    </q-banner>  
  </transition>
</template>

<script>
export default {
  name: 'no-tasks'
}
</script>script
