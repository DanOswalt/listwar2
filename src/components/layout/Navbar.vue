<template lang="html">
  <nav class="navbar">
    <div class="nav-wrapper deep-orange lighten-1">
      <router-link to="/" class="brand-logo">ListWar</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="!authUser"><router-link :to="{ name: 'Register' }">Sign Up</router-link></li>
        <li v-if="!authUser"><router-link :to="{ name: 'Login' }">Login</router-link></li>
        <li v-if="authUser" @click="logout"><a>{{ authUser.email }}</a></li>
        <li v-if="authUser" @click="logout"><a><i class="material-icons">exit_to_app</i></a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data () {
    return {
      authUser: null
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.authUser = authUser
      } else {
        this.authUser = null
      }
    })
  }
}
</script>

<style lang="css">
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  nav .brand-logo {
    margin-left: 20px;
  }
</style>
