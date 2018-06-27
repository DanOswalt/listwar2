<template lang="html">
  <div class="thumbnail">
    <div class="card white">
      <div class="card-content teal-text text-darken-4">
        <span class="card-title center">{{ list.title }}</span>
        <ul class="list-entries collection">
          <li class="list-entry collection-item white-text teal" v-for="(entry, index) in list.entries" :key="index">{{ entry.value }}</li>
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

  .thumbnail .collection {
    border-radius: 10px;
  }
</style>
