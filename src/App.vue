<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('settings/loadSettings')
    this.$store.dispatch('auth/handleAuthStateChange')
  }
}
</script>