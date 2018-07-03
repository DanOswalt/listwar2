<template lang="html">
  <div class="home container">
    <header class="row">
      <h3 class="center grey-text text-darken-2">King your list</h3>
      <div class="col s10 offset-s2 m8 offset-m3 l6 offset-l4">
        <blockquote>
          <ul class="grey-text">
            <li><span class="description deep-orange-text">Create</span> a list of things.</li>
            <li><span class="description deep-orange-text">Battle</span> those things 1 v 1.</li>
            <li><span class="description deep-orange-text">Discover</span>  the true pecking order.</li>
            <li><span class="description teal-text darken-2">Share and compare.</span></li>     
          </ul> 
        </blockquote>
      </div>
    </header>
    <section class="row saved-lists container">
      <!-- list thumbnail cards -->
      <div class="row">
        <ul v-if="user.lists && user.lists.length > 0 " class="list-thumbnails">
          <li v-for="(list, index) in user.lists" :key="index">
            <div class="col s12 m8 offset-m2">
              <ListThumbnail :list='list' :username='user.username' :createdon='list.createdOn'/>
            </div>
          </li>
        </ul>
        <div v-else>Create a list</div>
      </div>
    </section>
    <router-link :to="{ name: 'CreateList', params: { userId: user.userId } }" class="createlist-btn btn-floating btn-large orange darken-4" :class="{ pulse: !user.lists }"><i class="material-icons">add</i></router-link>
  </div>
</template>

<script>
import ListThumbnail from '@/components/views/Home/ListThumbnail.vue'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Home',
  components: {
    ListThumbnail
  },
  data () {
    return {
      user: 'null'
    }
  },
  mounted () {
    let authUser = firebase.auth().currentUser

    // if a user is logged in, find that user by uid in the users collection
    // is there no get user by id? what is a snapshot exactly?

    if (authUser) {
      db.collection('users').where('userId', '==', authUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            db.collection('users').doc(doc.id).get()
              .then(doc => {
                this.user = doc.data()
                console.log('current user:', this.user.username)
              })
              .catch(err => {
                console.log('user GET error', err.message)
              })
          })
        })
        .then(() => {
          db.collection('lists').where('creatorId', '==', authUser.uid).get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                this.user.lists.push(doc.data())
              })
            })
            .catch(err => {
              console.log('list fetch error', err.message)
            })
        })
        .catch(err => {
          console.log('user fetch error', err.message)
        })
    }
  }
}
</script>

<style lang="css">
  .home {
    height: 100vh;
  }

  .home {

  }

  .home .description {
    font-weight: bold;
  }

  .home .thumbnail {
    cursor: pointer;
  }

  .home .createlist-btn {
    position: fixed;
    bottom: 2em;
    right: 2em;
  }
</style>
