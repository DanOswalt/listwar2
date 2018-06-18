<template lang="html">
  <div class="thumbnail">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title center">{{ list.title }}</span>
        <ul class="list-entries collection">
          <li class="list-entry collection-item blue-grey-text darken-2" v-for="(entry, index) in list.entries" :key="index">{{ entry.value }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListThumbnail',
  props: [
    'list'
  ],
  data () {
    return {}
  }
}
</script>

<style lang="css">
</style>
