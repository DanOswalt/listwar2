<template lang="html">
  <div class="thumbnail hoverable">
    <div class="card white">
      <i class="material-icons right grey-text remove thumbnail-action">highlight_off</i>
      <div class="card-content grey-text text-darken-3">
        <h5 class="card-title center">{{ list.title }}</h5>
        <pre class="center-align grey-text">created by <span class="orange-text text-darken-4">{{ username }}</span> <span class="grey-text">{{ moment(list.createdOn).fromNow() }}</span></pre>
        <ul class="list-entries collection">
          <li class="list-entry collection-item white-text teal" v-for="(entry, index) in list.entries" :key="index">{{ entry }}</li>
        </ul>
        <br>
        <div class="row actions">
          <ul class="actions-menu">
            <li class="col s4 center">
              <i class="material-icons grey-text thumbnail-action">play_circle_outline</i>
            </li>
            <li class="col s4 center">
              <i class="material-icons grey-text thumbnail-action">content_copy</i>
            </li>
            <li class="col s4 center">
              <i class="material-icons grey-text thumbnail-action">share</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'ListThumbnail',
  props: [
    'list',
    'username',
    'createdon'
  ],
  data () {
    return {}
  },
  methods: {
    deleteList () {
      // db.collections('lists').
    }
  }
}
</script>

<style lang="css">
  .thumbnail {
    cursor: default !important;
  }

  .thumbnail .collection {
    border-radius: 10px;
  }

  .thumbnail .remove {
    position: absolute;
    font-size: 2em;
    top: 0.7em;
    right: 0.7em;
  }

  .thumbnail .thumbnail-action {
    cursor: pointer;
  }

</style>
