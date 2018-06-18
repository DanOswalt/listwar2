<template lang="html">
  <div class="home container">
    <header class="center">
      <p class="center flow-text">Rank your impossible-to-sort list with head-to-head battles.</p>
    </header>
    <section class="saved-lists container">
      <!-- list thumbnail cards -->
      <div class="row">
        <ul class="list-thumbnails">
          <li v-for="(list, index) in savedLists" :key="index">
            <div class="col s12 m6">
              <ListThumbnail :list='list'/>
            </div>
          </li>
        </ul>
      </div>
    </section>
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
  .home .thumbnail {
    cursor: pointer
  }
</style>
