<template>
  <q-select filled 
            v-model="sortBy" 
            :options="options" 
            emit-value
            map-options
            label="Sort by" 
            class="sort-selector col q-ml-sm"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sort',
  data () {
    return {
      options: [
        { label: 'Name', value: 'name' },
        { label: 'Date', value: 'dueDate' }
      ],
    }
  },
  computed: {
    ...mapGetters('tasks', ['sort']),
    sortBy: {
      get() {
        return this.sort
      },
      set(newVal) {
        this.$store.dispatch('tasks/setSort', newVal)
      }
    }
  }
}
</script>

<style >
 .sort-selector {
  flex: 0 0 112px;
 }
</style>