<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  html {
    background: #333;
    font-family: 'Gaegu', sans-serif;
  }

  .title {
    font-family: 'Amatic SC';
  }
</style>
