<template lang="html">
  <div class="home container">
    <header class="center">
      <p class="center flow-text">Rank your impossible-to-sort list with head-to-head battles.</p>
    </header>
    <section class="saved-lists container">
      <!-- list thumbnail cards -->
      <div class="row">
        <ul v-if="savedLists" class="list-thumbnails">
          <li v-for="(list, index) in savedLists" :key="index">
            <div class="col s12 m6">
              <ListThumbnail :list='list'/>
            </div>
          </li>
        </ul>
        <div v-else>Create a list</div>
      </div>
    </section>
    <router-link to="/createlist" class="createlist-btn btn-floating btn-large indigo pulse"><i class="material-icons">add</i></router-link>
  </div>
</template>

<script>
import ListThumbnail from '@/components/views/Home/ListThumbnail.vue'
import savedLists from '@/mock/savedLists.json'

export default {
  name: 'Home',
  components: {
    ListThumbnail
  },
  data () {
    return {
      savedLists
    }
  }
}
</script>

<style lang="css">
  .home {
    height: 100vh;
  }

  .home .thumbnail {
    cursor: pointer;
  }

  .createlist-btn {
    position: fixed;
    bottom: 2em;
    right: 2em;
  }
</style>
