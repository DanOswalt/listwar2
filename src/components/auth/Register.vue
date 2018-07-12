<template lang="html">
  <div class="register container row">
    <div class="col s12 m6 offset-m3">
      <form @submit.prevent="register" class="card-panel teal-text text-darken-4">
        <h4 class="card-title center">Sign Up to save and share lists</h4>
        <div class="input-field">
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email">
        </div>
        <div class="input-field">
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="password">
        </div>
        <div class="input-field">
          <label for="username">Username:</label>
          <input type="text" name="username" v-model="username">
        </div>
        <div class="field center">
          <button class="btn teal">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Register',
  data () {
    return {
      email: null,
      password: null,
      username: null,
      msg: null
    }
  },
  methods: {
    register () {
      if (this.username && this.email && this.password) {
        // this ref is a doc? the username is the id, id would normally be used here
        let ref = db.collection('users').doc(this.username)
        // console.log('ref', ref)

        // try to see if a doc with that username exists
        ref.get().then(doc => {
          if (doc.exists) {
            this.msg = 'Try again, this username is taken'
            console.log(this.msg)
          } else {
            this.msg = 'looks good:' + this.username
            console.log(this.msg)

            // if not, create in auth db
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  username: this.username,
                  userId: cred.user.uid,
                  access: []
                })
              })
              .then(() => {
                this.$router.push({ name: 'Home' })
              })
              .catch(err => {
                this.msg = err.message
                console.log(this.msg)
              })
          }
        })
      } else {
        this.msg = 'Enter something for all fields.'
        console.log(this.msg) // i want a consistent place in the layout for all user messages
      }
    }
  }
}
</script>

<style lang="css">
  .register {
    margin-top: 90px;
  }
</style>
