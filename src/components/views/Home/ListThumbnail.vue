<template lang="html">
  <div class="thumbnail hoverable">
    <div class="card">
      <i @click="deleteList" class="material-icons right grey-text remove thumbnail-action hoverable">highlight_off</i>
      <div class="card-content grey-text text-lighten-2">
        <h5 class="title center">{{ list.title }}</h5>
        <pre class="center-align grey-text">created by <span class="orange-text text-darken-4">{{ user.username }}</span> <span class="grey-text">{{ $moment(list.createdOn).fromNow() }}</span></pre>
        <ul class="list-entries collection">
          <li class="list-entry collection-item grey-text text-lighten-2 teal" v-for="(entry, index) in list.entries" :key="index">{{ entry.value }}</li>
        </ul>
        <br>
        <div class="row actions">
          <ul class="actions-menu">
            <li class="col s4 center hoverable thumbnail-action">
              <i @click="goToList(user, list)" class="material-icons grey-text">play_circle_outline</i>
            </li>
            <li class="col s4 center hoverable thumbnail-action">
              <i class="material-icons grey-text thumbnail-action">content_copy</i>
            </li>
            <li class="col s4 center hoverable thumbnail-action">
              <i class="material-icons grey-text">share</i>
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
    'user'
  ],
  data () {
    return {
      params: {
        listid: this.list.id,
        title: this.list.title,
        list: this.list,
        user: this.user
      }
    }
  },
  methods: {
    deleteList () {
      console.log('list', this.list)
      // remove this list both as a accessor, and as a creator, if created
      let ref = db.collections('users').doc(this.user.id)
      ref.update({
        // just remove from accessors array, leave as creator, in case other have it
      })
    },
    goToList () {
      this.$router.push({ name: 'List', params: this.params })
    }
  }
}
</script>

<style lang="css">
  .thumbnail {
    cursor: default !important;
    margin-bottom: 60px;
  }

  .thumbnail .card {
    /* border-radius: 3%; */
  }

  .thumbnail .card-content {
    background: #333;
  }

  .thumbnail .collection {
    /* border-radius: 3%; */
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
