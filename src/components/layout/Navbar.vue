<template lang="html">
  <nav class="navbar">
    <div class="nav-wrapper deep-orange lighten-1">
      <router-link to="/" class="brand-logo">ListWar</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="!authUser"><router-link :to="{ name: 'Register' }" class="deep-orange-text text-lighten-5">Sign Up</router-link></li>
        <li v-if="!authUser"><router-link :to="{ name: 'Login' }" class="deep-orange-text text-lighten-5">Login</router-link></li>
        <li v-if="authUser" @click="" ><a class="deep-orange-text text-lighten-5"><i class="material-icons left deep-orange-text text-lighten-5">face</i>{{ authUser.email }}</a></li>
        <li v-if="authUser" @click="logout"><a><i class="material-icons deep-orange-text text-lighten-5">exit_to_app</i></a></li>
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
  created () {
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
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 60px;
    border-bottom: 3px solid #ffab91;
  }

  .navbar .brand-logo {
    margin-left: none;
  }

  @media (min-width: 1000px) {
    .navbar .brand-logo {
      margin-left: 20px;
    }
  }
</style>
