<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator>
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" />
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import loginRegister from '../components/auth/login-register'

export default {
  name: 'page-auth',
  components: {
    loginRegister
  },
  data () {
    return {
      tab: 'register'
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>