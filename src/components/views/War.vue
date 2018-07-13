<template lang="html">
  <div class="war container">
    <header>
      <h3 class="title center grey-text text-lighten-2">War!</h3>
    </header>
    <section class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <!-- <ListThumbnail :list='list' :user='user'/> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'War',
  data () {
    return {
      list: this.$route.params.list,
      creator: this.$route.params.creator,
      title: this.$route.params.title,
      user: this.$route.params.user
    }
  },
  created () {
    console.log('list:', this.list)
    console.log('creator:', this.creator)
    console.log('title:', this.title)
    console.log('current user:', this.user)

    if (!this.list) {
      // if no list is defined, look for the username and list
      // need to fetch list by creator and list name if coming from url
      // TODO: need to create the message layout component
      // no current user needed until saving at the end; anon
    }
  }
}
</script>

<style lang="css">
  .war {
    height: 100vh;
    margin-top: 90px;
    background-color: #333;
  }
</style>
