<template lang="html">
  <div class="login container row">
    <div class="col s12 m6 offset-m3"> 
      <form @submit.prevent="login" class="card-panel teal-text text-darken-4">
      <h4 class="card-title center">Log In</h4>
        <div class="input-field">
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email" autofocus>
        </div>
        <div class="input-field">
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="password">
        </div>
        <div class="field center">
          <button type="submit" class="btn teal">Log Me In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
// import db from '@/firebase/init'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      msg: null
    }
  },
  methods: {
    login () {
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log('user:', cred.user)
            this.$router.push({ name: 'Home' })
          })
          .catch(err => {
            console.log('error', err.message)
          })

        this.msg = null
      } else {
        this.msg = 'Please fill out both fields'
        console.log(this.msg)
      }
    }
  }
}
</script>

<style lang="css">
  .login {
    margin-top: 90px;
  }
</style>
