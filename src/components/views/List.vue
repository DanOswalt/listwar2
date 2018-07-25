<template lang="html">
  <div class="list-view container">
    <header>
      <h3 class="title center grey-text text-lighten-2">War!</h3>
    </header>

    <section class="msg-box">
      <user-msg :msg="msg"></user-msg>
    </section>

    <section v-show="status === 'intro'" class="war-intro container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <button @click="startWar" class="btn-large">go</button>
        </div>
      </div>
    </section>

    <section v-show="status === 'warring'" class="war-box container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <button @click="pickWinner(heroIndex, villainIndex)" class="btn-large">{{ hero.value }}</button>
          <button @click="pickWinner(villainIndex, heroIndex)" class="btn-large">{{ villain.value }}</button>
        </div>
      </div>
    </section>

    <section v-show="status === 'complete'" class="results container">
      <p class="white-text">{{ this.result }}</p>
      <button @click="result.public = !result.public">Make result public?</button>
    </section>
  </div>
</template>

<script>
import UserMsg from '@/components/layout/UserMsg.vue'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'List',
  components: {
    UserMsg
  },
  data () {
    return {
      list: this.$route.params.list,
      listId: this.$route.params.listid,
      title: this.$route.params.title,
      user: this.$route.params.user,
      msg: {
        content: '',
        type: 'hide'
      },
      completed: false,
      schedule: [],
      status: 'intro',
      result: null,
      hero: { value: '' },
      heroIndex: null,
      villain: { value: '' },
      villainIndex: null
    }
  },
  methods: {
    userMsg (content, type) {
      this.msg = content ? { content, type } : { content: '', type: 'hide' }
    },
    checkForCurrentUser () {
      let authedUser = firebase.auth().currentUser

      if (authedUser) {
        db.collection('users').where('userId', '==', authedUser.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              db.collection('users').doc(doc.id).get()
                .then(doc => {
                  this.user = doc.data()
                  this.checkUserAccess()
                })
                .catch(err => {
                  this.userMsg(err.message, 'error')
                })
            })
          })
      }
    },
    checkUserAccess () {
      if (this.user.access.includes(this.listId)) {
        this.checkIfCompleted()
        if (this.completed) {
          this.status = 'complete'
        } else {
          this.createSchedule()
          this.createEmptyResult()
          this.userMsg()
        }
      } else {
        this.blockAccess()
      }
    },
    checkForListExistence () {
      return db.collection('lists').doc(this.listId).get()
    },
    checkIfCompleted () {
      this.completed = this.list.completedBy.includes(this.user.userId)
      if(this.completed) {
        this.status = 'complete'
        this.result = this.user.results[this.listId]
      }
    },
    startWar () {
      this.status = 'warring'
      this.nextBattle()
    },
    createEmptyResult () {
      this.result = {
        timestamp: null,
        listId: this.list.id,
        entries: this.list.entries.map((entry, index) => {
          return {
            value: entry.value,
            points: 0,
            id: index,
            beats: [],
            rank: null
          }
        })
      }
    },
    pickWinner (winnerIndex, loserIndex) {
      this.result.entries[winnerIndex].points += 1
      this.result.entries[winnerIndex].beats.push(loserIndex)
      this.nextBattle()
    },
    createSchedule () {
      const n = this.list.entries.length

      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const matchIndices = [i, j]
          const shuffled = this.$chance.shuffle(matchIndices)
          this.schedule.push(shuffled)
        }
      }
      this.schedule = this.$chance.shuffle(this.schedule)
    },
    nextBattle () {
      if (this.schedule.length > 0) {
        this.battle = this.schedule.pop()
        this.heroIndex = this.battle[0]
        this.villainIndex = this.battle[1]
        this.hero = { value: this.list.entries[this.heroIndex].value, index: this.heroIndex }
        this.villain = { value: this.list.entries[this.villainIndex].value, index: this.villainIndex }
      } else {
        this.finish()
      }
    },
    finish () {
      this.status = 'complete'
      this.result.completed = true
      this.result.completedBy = this.user.userId
      this.result.timestamp = Date.now()
      this.result.entries.sort((a, b) => {
        return b.points - a.points
      })
      this.result.entries.forEach((entry, index) => {
        entry.rank = index + 1
      })

      if (this.user.username !== 'anonymous') {
        this.list.completedBy.push(this.user.userId)
        this.user.results[this.listId] = this.result
        db.collection('lists').doc(this.listId).set(this.list)
        db.collection('users').doc(this.user.username).set(this.user)
      }

      // work on tiebreaks later
      console.log('all done', this.result)
    },
    blockAccess () {
      this.status = 'no list'
      this.userMsg('Sorry, list is either not shared or could not be found', 'error')
    }
  },
  mounted () {
    /* user can get here 2 ways:
      1. clicking on the list thumbnail battle button, where list and user are authorized already
      2. directly via the url (if shared or reloaded)
    */

    if (!this.list) {
      this.checkForListExistence()
        .then(doc => {
          if (doc.exists) {
            this.list = doc.data()
            // if the list had to be loaded this way, we need to check if they have access
            this.checkForCurrentUser()
          } else {
            this.blockAccess()
          }
        })
    } else {
      // if the list is already populated, the user is already authorized
      this.checkIfCompleted()

      if (!this.completed) {
        this.createSchedule()
        this.createEmptyResult()
      } else {
        this.status = 'complete'
      }
    }
  }
}
</script>

<style lang="css">
  .list-view {
    height: 100vh;
    margin-top: 90px;
    background-color: #333;
  }
</style>
