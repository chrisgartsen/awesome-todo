<template>
  <q-banner dense class="text-white text-center list-header" :class="headerColor">
    <span class="text-subtitle1"><slot></slot></span>
  </q-banner>
</template>

<script>
  export default {
    name: 'list-header',
    props: {
      headerColor: {
        required: true,
        type: String
      }
    }
  }
</script>