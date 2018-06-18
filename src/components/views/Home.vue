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
        },
        {
          title: 'colors',
          entries: [
            {
              value: 'orange',
              wins: 0
            },
            {
              value: 'yellow',
              wins: 0
            },
            {
              value: 'blue',
              wins: 0
            },
            {
              value: 'green',
              wins: 0
            },
            {
              value: 'orange',
              wins: 0
            },
            {
              value: 'yellow',
              wins: 0
            },
            {
              value: 'blue',
              wins: 0
            },
            {
              value: 'green',
              wins: 0
            },
            {
              value: 'orange',
              wins: 0
            },
            {
              value: 'yellow',
              wins: 0
            },
            {
              value: 'blue',
              wins: 0
            },
            {
              value: 'green',
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
