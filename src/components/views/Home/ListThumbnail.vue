<template lang="html">
  <div class="thumbnail hoverable">
    <div class="card white">
      <i @click="deleteList" class="material-icons right grey-text remove thumbnail-action">highlight_off</i>
      <div class="card-content grey-text text-lighten-2">
        <h5 class="title center">{{ list.title }}</h5>
        <pre class="center-align grey-text">created by <span class="orange-text text-darken-4">{{ user.username }}</span> <span class="grey-text">{{ moment(list.createdOn).fromNow() }}</span></pre>
        <ul class="list-entries collection">
          <li class="list-entry collection-item grey-text text-lighten-2 teal" v-for="(entry, index) in list.entries" :key="index">{{ entry }}</li>
        </ul>
        <br>
        <div class="row actions">
          <ul class="actions-menu">
            <li class="col s4 center">
              <i @click="goToWar(user, list)" class="material-icons grey-text thumbnail-action">play_circle_outline</i>
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
    'user'
  ],
  data () {
    return {
      warParams: {
        creator: this.list.creatorUsername,
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
    goToWar () {
      this.$router.push({ name: 'War', params: this.warParams })
    }
  }
}
</script>

<style lang="css">
  .thumbnail {
    cursor: default !important;
  }

  .thumbnail .card {
    border-radius: 3%;
  }

  .thumbnail .card-content {
    background: #555;
  }

  .thumbnail .collection {
    border-radius: 3%;
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
