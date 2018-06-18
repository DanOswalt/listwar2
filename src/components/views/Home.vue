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
              <!-- <div class="card blue-grey darken-1 thumbnail">
                <div class="card-content white-text">
                  <span class="card-title center">{{ list.title }}</span>
                  <ul class="list-entries collection">
                    <li class="list-entry collection-item blue-grey-text darken-2" v-for="(entry, index) in list.entries" :key="index">{{ entry.value }}</li>
                  </ul>
                </div>
              </div> -->
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import ListThumbnail from '@/components/views/Home/ListThumbnail.vue'
export default {
  name: 'Home',
  components: {
    ListThumbnail
  },
  data () {
    return {
      savedLists: [
        {
          title: 'animals/foods',
          entries: [
            {
              value: 'cats',
              wins: 0
            },
            {
              value: 'dogs',
              wins: 0
            },
            {
              value: 'snakes',
              wins: 0
            },
            {
              value: 'pickles',
              wins: 0
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="css">
  .home .thumbnail {
    cursor: pointer
  }
</style>
