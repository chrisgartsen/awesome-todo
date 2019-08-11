<template>
  <q-input v-model="searchField" label="Search" outlined class="col" v-select-all >
    <template v-slot:append>
      <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectAll } from 'src/utils/directive-select-all'

export default {
  name: 'search',
  computed: {
    ...mapGetters('tasks', ['search']),
    searchField: {
      get () {
        return this.search
      },
      set(newVal) {
        this.$store.dispatch('tasks/setSearch', newVal)
      }
    }
  },
  directives: {
    selectAll
  }
}
</script>