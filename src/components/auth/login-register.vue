<template>
<q-form @submit.prevent="onSubmit">
  <div class="row q-mb-md">
    <q-banner class="bg-grey-3 col">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" class="q-mr-md" />
        {{ tab | titleCase }} to access your Awesome Todos. <br/>
        This is a sandbox application, not intended for actual use!
      </template>
    </q-banner>
  </div>
  <div class="row q-mb-md">
    <q-input outlined 
             v-model="formData.email" 
             label="Email" 
             class="col" 
             lazy-rules 
             :rules="[val => isValidEmail(val) || 'Please enter a valid email address.']"
    />
  </div>
  <div class="row q-mb-md">
    <q-input type="password" 
             outlined 
             v-model="formData.password" 
             label="Password" 
             class="col"
             lazy-rules 
             :rules="[val => val.length >= 6 || 'Password should be minimum of 6 characters']" />
  </div>
  <div class="row q-mb-md">
    <q-space />
    <q-btn color="primary" :label="tab" type="submit" />
  </div>
</q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  props: {
    tab: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    onSubmit() {
      if(this.tab === 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    },
    isValidEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>