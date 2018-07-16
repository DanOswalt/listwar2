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
      schedule: [],
      status: 'intro',
      listwar: {
        final: null,
        dateCompleted: null,
        endPoint: `${this.creator}/${this.title}`,
        title: this.title,
        completedBy: null,
        listId: null,
        public: false
      },
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
    pickWinner (index) {
      this.winner = index
      this.listwar.results[this.winner].points += 1
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
      console.log('schedule', this.schedule)
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
      this.listwar.results.sort((a, b) => {
        return b.points - a.points
      })
      console.log('all done', this.listwar)
    }
  },
  mounted () {
    // will need to check if completed is true. if so, skip listwar, just show listwars? or, shouldn't
    // go to this screen... if user visits this url, what should happen?
    this.listwar.results = this.list.entries.map(entry => {
      return {
        value: entry.value,
        points: 0
      }
    })

    if (!this.list) {
      // if no list is defined, look for the username and list
      // need to fetch list by creator and list name if coming from url
      // no current user needed until saving at the end; anon
    }

    this.createSchedule()
  }
}
</script>

<style lang="css">
  .listwar {
    height: 100vh;
    margin-top: 90px;
    background-color: #333;
  }
</style>
