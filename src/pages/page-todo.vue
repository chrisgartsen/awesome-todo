<template>
  <q-page class="q-pa-md">
    <q-list bordered separator>
       
      <q-item v-for="task in tasks" :key="task.id" v-ripple 
              @click="task.completed = !task.completed" clickable :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'">
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="{'text-strikethrough' : task.completed}">{{ task.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-xs"/>
            </div>
            <div class="column">
              <q-item-label caption class="row justify-end">{{ task.dueDate }}</q-item-label>
              <q-item-label caption class="row justify-end"><small>{{ task.dueTime }}</small></q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>

    </q-list>
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
        { id: 'ID1', name: 'Wash Car', completed: false, dueDate: '2019/05/18', dueTime: '18:30' },
        { id: 'ID2', name: 'Buy Groceries', completed: false, dueDate: '2019/04/11', dueTime: '17:30' },
        { id: 'ID3', name: 'Get bananas', completed: false, dueDate: '2019/06/20', dueTime: '15:00' },
      ]
    }
  }
}
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>