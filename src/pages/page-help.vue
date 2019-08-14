<template>
  <q-page padding>
    <q-btn flat color="primary" icon="chevron_left" label="Back" to="/settings" />
    <h5>About this app</h5>  
    <p>
      This app is sandbox application and an adaptation of the excellent Udemy course: 
      <strong class="text-primary">Quasar Framework: Cross-Platform Vue JS Vuex & Firebase Apps</strong>
    </p>
    <p>
      Go to the Udemy website <q-btn flat dense color="primary" @click=" visitUdemy">here</q-btn> to go to the course.
    </p>
  </q-page>  
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'page-help',
  methods: {
    visitUdemy() {
      openURL("https://www.udemy.com/quasarframework/")
    }
  }
}
</script>