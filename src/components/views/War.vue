<template lang="html">
  <div class="war container">
    <header>
      <h3 class="title center grey-text text-lighten-2">War!</h3>
    </header>

    <section v-if="status === 'intro'" class="war-intro container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <button @click="startWar" class="btn-large">go</button>
        </div>
      </div>
    </section>

    <section v-if="status === 'warring'" class="war-box container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <button @click="pickWinner(heroIndex)" class="btn-large">{{ hero.value }}</button>
          <button @click="pickWinner(villainIndex)" class="btn-large">{{ villain.value }}</button>
        </div>
      </div>
    </section>
  
  </div>
</template>

<script>
// import firebase from 'firebase'
// import db from '@/firebase/init'

export default {
  name: 'War',
  data () {
    return {
      list: this.$route.params.list,
      creator: this.$route.params.creator,
      title: this.$route.params.title,
      user: this.$route.params.user,
      status: 'intro',
      results: null,
      hero: null,
      heroIndex: null,
      villain: null,
      villainIndex: null,
      winner: null
    }
  },
  methods: {
    userMsg (content, type) {
      this.msg = content ? { content, type } : { content: '', type: 'hide' }
    },
    startWar () {
      this.status = 'warring'
      this.results = this.list.entries.slice()
      this.results.forEach(entry => {
        entry.points = 0
      })
      this.createSchedule()
      this.nextBattle()
    },
    pickWinner (index) {
      this.winner = index
      this.results[this.winner].points += 1
      this.nextBattle()
    },
    createSchedule () {
      // randomize order and position
      this.schedule = [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 3]
      ]
    },
    nextBattle() {
      if (this.schedule.length > 0) {
        this.battle = this.schedule.pop()
        this.heroIndex = this.battle[0]
        this.villainIndex = this.battle[1]
        this.hero = { value: this.list.entries[this.heroIndex].value, index: this.heroIndex }
        this.villain = { value: this.list.entries[this.villainIndex].value, index: this.villainIndex }
      } else {
        this.results.sort((a, b) => {
          return b.points - a.points
        })
        console.log('all done', this.results)
      }
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
