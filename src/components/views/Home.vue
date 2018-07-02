<template lang="html">
  <div class="home container">
    <header class="center">
      <p class="center flow-text">Rank your impossible-to-sort list with head-to-head battles.</p>
    </header>
    <section class="saved-lists container">
      <!-- list thumbnail cards -->
      <div class="row">
        <ul v-if="user.lists && user.lists.length > 0 " class="list-thumbnails">
          <li v-for="(list, index) in user.lists" :key="index">
            <div class="col s12 m6">
              <ListThumbnail :list='list'/>
            </div>
          </li>
        </ul>
        <div v-else>Create a list</div>
      </div>
    </section>
    <router-link :to="{ name: 'CreateList', params: { user_id: user.user_id } }" class="createlist-btn btn-floating btn-large orange darken-4" :class="{ pulse: !user.lists }"><i class="material-icons">add</i></router-link>
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
      db.collection('users').where('user_id', '==', authUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            db.collection('users').doc(doc.id).get()
              .then(doc => {
                this.user = doc.data()
                console.log('this user in get user', this.user)
              })
              .catch(err => {
                console.log('user GET error', err.message)
              })
          })
        })
        .then(() => {
          db.collection('lists').where('creator_id', '==', authUser.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.user.lists.push(doc.data())
            })
            console.log('this user in get lists', this.user.lists)
          })
        })
        .catch(err => {
          console.log('user GET error', err.message)
        })

      
    }
  }
}
</script>

<style lang="css">
  .home {
    height: 100vh;
  }

  .home .thumbnail {
    cursor: pointer;
  }

  .createlist-btn {
    position: fixed;
    bottom: 2em;
    right: 2em;
  }
</style>
