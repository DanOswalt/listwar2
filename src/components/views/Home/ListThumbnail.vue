<template lang="html">
  <div class="thumbnail">
    <div class="card white">
      <div class="card-content grey-text text-darken-3">
        <h5 class="card-title center">{{ list.title }}</h5>
        <pre class="center-align grey-text">created by <span class="orange-text text-darken-4">{{ username }}</span> <span class="grey-text">{{ moment(list.createdOn).fromNow() }}</span></pre>
        <ul class="list-entries collection">
          <li class="list-entry collection-item white-text teal" v-for="(entry, index) in list.entries" :key="index">{{ entry }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListThumbnail',
  props: [
    'list',
    'username',
    'createdon'
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
