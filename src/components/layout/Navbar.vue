<template lang="html">
  <nav>
    <div class="nav-wrapper orange darken-4">
      <router-link to="/" class="brand-logo">ListWar</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to="{ name: 'Register' }">Sign Up</router-link></li>
        <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
        <li @click="logout"><a>Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data () {
    return {}
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
    }
  }
}
</script>

<style lang="css">
</style>
