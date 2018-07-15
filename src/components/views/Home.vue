<template lang="html">
  <div class="home container">
    <header class="row">
      <h3 class="title center grey-text text-lighten-2">Your Lists</h3>
    </header>

    <section class="msg-box">
      <user-msg :msg="msg"></user-msg>
    </section>

    <section class="row container">
      <!-- list thumbnail cards -->
      <div class="row">
        <ul v-if="user.lists.length > 0 " class="list-thumbnails">
          <li v-for="(list, index) in user.lists" :key="index">
            <div class="col s12 m8 offset-m2">
              <ListThumbnail :list='list' :user='user'/>
            </div>
          </li>
        </ul>
        <div v-else>
          <!-- <blockquote class="introduction">
            <ul class="grey-text">
              <li><span class="description deep-orange-text">Create</span> a list of things.</li>
              <li><span class="description deep-orange-text">Battle</span> those things 1 v 1.</li>
              <li><span class="description deep-orange-text">Discover</span>  the true pecking order.</li>
              <li><span class="description teal-text darken-2">Share and compare.</span></li>
            </ul>
          </blockquote> -->
          <div class="progress">
            <div class="indeterminate"></div>
          </div>
        </div>
      </div>
    </section>
    <router-link :to="{ name: 'CreateList', params: { user: user } }" class="createlist-btn btn-floating btn-large orange darken-4" :class="{ pulse: noLists }"><i class="material-icons">add</i></router-link>
  </div>
</template>

<script>
import ListThumbnail from '@/components/views/Home/ListThumbnail.vue'
import UserMsg from '@/components/layout/UserMsg.vue'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Home',
  components: {
    ListThumbnail,
    UserMsg
  },
  data () {
    return {
      user: {
        userId: null,
        username: 'anonymous',
        access: [],
        lists: []
      },
      userRef: null,
      msg: {
        content: '',
        type: 'hide'
      }
    }
  },
  computed: {
    noLists () {
      return this.user.lists.length === 0
    }
  },
  methods: {
    userMsg (content, type) {
      this.msg = content ? { content, type } : { content: '', type: 'hide' }
    }
  },
  mounted () {
    let authedUser = firebase.auth().currentUser

    // if a user is logged in, find that user by uid in the users collection
    // is there no get user by id? what is a snapshot exactly?

    if (authedUser) {
      db.collection('users').where('userId', '==', authedUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.userRef = db.collection('users').doc(doc.id)
            this.userRef.get()
              .then(doc => {
                this.user = doc.data()
                this.user.lists = []
                this.userMsg()
              })
              .catch(err => {
                this.userMsg(err.message, 'error')
              })
          })
        })
        .then(() => {
          db.collection('lists').get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                let list = doc.data()
                list.id = doc.id
                // list.entries.sort((a, b) => {
                //   const timeA = parseInt(a)
                //   const timeB = parseInt(b)
                //   return timeA - timeB
                // })
                if (this.user.access.includes(list.id)) {
                  this.user.lists.push(list)
                  this.userMsg(`Hello ${this.user.username}!`, 'info')
                }
              })
            })
            .catch(err => {
              this.userMsg(err.message, 'error')
            })
        })
        .catch(err => {
          this.userMsg(err.message, 'error')
        })
    } else {
      this.userMsg()
    }
  }
}
</script>

<style lang="css">
  .home {
    height: 100vh;
    margin-top: 90px;
    background-color: #333;
  }

  .home .description-box {
    position: fixed;
    top: 150px;
    left: 30px;
  }

  .home .introduction {
    margin: auto 0;
    font-size: 1.8em;
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
