<template>
  <q-layout view="hHh Lpr fFf">
    
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">Awesome Todo</q-toolbar-title>
        <q-btn v-if="!isLoggedIn" icon-right="account_circle" flat class="absolute-right" label="Login" to="/auth" />
        <q-btn v-if="isLoggedIn" icon-right="account_circle" flat class="absolute-right" label="Logout" @click="logoutUser" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2" :breakpoint="767" :width="200">
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item v-for="nav in navs" :key="nav.label" clickable :to="nav.to" exact>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-tabs>
        <q-route-tab v-for="nav in navs" :key="nav.label" :icon="nav.icon" :label="nav.label" :to="nav.to"  exact/>
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'layout',
  data () {
    return {
      leftDrawerOpen: true,
      navs: [
        { label: 'Todo', to: '/', icon: 'list'},
        { label: 'Settings', to: '/settings', icon: 'settings'}
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
}
</script>