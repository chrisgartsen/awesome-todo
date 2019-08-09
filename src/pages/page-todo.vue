<template>
  <q-page padding>
    <p>Todo Page</p>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'page-todo',
  data() {
    return {
      tasks: [
        { id: 'ID1', name: 'Wash Car', completed: false },
        { id: 'ID2', name: 'Buy Groceries', completed: false },
        { id: 'ID3', name: 'Get bananas', completed: false },
      ]
    }
  }
}
</script>
