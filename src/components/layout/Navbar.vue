<template lang="html">
  <nav>
    <div class="nav-wrapper orange darken-4">
      <router-link to="/" class="brand-logo">ListWar</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Sign Up</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  }
}
</script>

<style lang="css">
</style>
