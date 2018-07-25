<template lang="html">
  <div class="list-view container">
    <header>
      <h3 class="title center grey-text text-lighten-2">War!</h3>
    </header>

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
// import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'List',
  data () {
    return {
      list: this.$route.params.list,
      creator: this.$route.params.creator,
      title: this.$route.params.title,
      user: this.$route.params.user,
      schedule: [],
      status: 'intro',
      result: null,
      hero: { value: '' },
      heroIndex: null,
      villain: { value: '' },
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
      this.nextBattle()
    },
    createEmptyResult () {
      this.result = {
        timestamp: null,
        title: this.title,
        completedBy: null,
        listId: this.list.id,
        public: false,
        completed: false,
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
      // create the finished result
      // append result to list if user is not anonymous
      // 
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



      // work on tiebreaks later
      console.log('all done', this.result)
    }
  },
  mounted () {
    // look for currentuser

    this.createSchedule()
    this.createEmptyResult()
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
