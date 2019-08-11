<template>
  <q-input v-model="searchField" label="Search" outlined class="col">

    <template v-slot:append>
      <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
      <q-icon name="search" />
    </template>

  </q-input>
</template>

<script>
import { mapGetters } from 'vuex'

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
  }
}
</script>