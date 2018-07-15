<template lang="html">
  <div class="createlist container">
    <header class="title">
      <div class=row>
        <div class="col s1">
          <i @click="$router.go(-1)" class="material-icons left medium back-btn hoverable grey-text lighten-2">chevron_left</i>
        </div>
        <div class="col s10">
          <h3 v-if="!entriesSubmitted" class="center-align grey-text text-lighten-2">Create a new list</h3>
          <h3 v-else class="center-align grey-text text-lighten-2">Give it a title!</h3>
        </div>
      </div>
    </header>

    <section class="msg-box">
      <user-msg :msg="msg"></user-msg>
    </section>

    <section class="row container">
      <div class="row">
        <ul> <!-- simulate home row indent -->
          <li>
            <div class="card hoverable col s12 m8 offset-m2">
              <!-- form row -->
              <div class="card-content">
                <form v-show="entriesSubmitted" @submit.prevent="createList" class="col s12 m8 offset-m2">
                  <div class="row">
                    <div class="input-field">
                      <input id="titleInput"
                            ref="title"
                            type="text"
                            v-model="title">
                      <label for="title">Title:</label>
                    </div>
                  </div>
                </form>

                <form @submit.prevent="addEntry" class="col s12 m8 offset-m2">
                  <div v-if="!entriesSubmitted" class="row">
                    <div class="input-field">
                      <input id="entryInput"
                            class="col s9"
                            type="text"
                            v-model="newEntry"
                            autofocus>
                      <button class="col s2 pull-right-1 btn-small teal darken-2 white-text" :class="{ disabled: !(this.newEntry && this.entryIsUnique)}">
                        <i @click="addEntry" class="material-icons center grey-text darken-6 add-item">playlist_add</i>
                      </button>
                      <label for="entry">Enter new item:</label>
                    </div>
                  </div>
                  <div class="row">
                    <ul v-show="entries.length > 0" class="entries-list collection">
                      <li v-for="(entry, index) in entries"
                          :key="index"
                          class="collection-item white-text"
                          :class="entryClasses">{{ entry }}
                          <i v-if=!entriesSubmitted @click="removeEntry(index)" class="material-icons right remove grey-text text-darken-2">highlight_off</i>
                      </li>
                    </ul>
                  </div>
                </form>

                <!-- submit button row -->
                <div class="row center-align">
                  <div v-if="!entriesSubmitted" class="col s12">
                    <div v-if="entriesCount >= 4" @click.prevent="submitEntries" class="btn orange darken-4">
                      <i class="material-icons right">arrow_right</i>{{ entriesCount }} entries, {{ roundCount }} rounds
                    </div>
                    <div v-else class="btn disabled">Enter more to submit</div>
                  </div>

                  <div v-if="entriesSubmitted" class="col s12">
                    <button class="btn orange darken-4" :class="{ disabled: !title }" @click="createList">Save List</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div> <!--row-->
    </section>
  </div>
</template>

<script>
import UserMsg from '@/components/layout/UserMsg.vue'
import db from '@/firebase/init'

export default {
  name: 'CreateList',
  components: {
    UserMsg
  },
  data () {
    return {
      user: this.$route.params.user,
      newEntry: '',
      title: '',
      entries: [],
      entriesSubmitted: false,
      msg: {
        content: 'Enter at least 4 items',
        type: 'info'
      }
    }
  },
  computed: {
    entriesCount () {
      return this.entries.length
    },
    roundCount () {
      let count = 0
      for (let i = 0; i < this.entriesCount; i++) {
        count += i
      }
      return count
    },
    entryIsUnique () {
      return !this.entries.includes(this.newEntry)
    },
    entryClasses () {
      return {
        'teal': this.entriesSubmitted,
        'darken-4': this.entriesSubmitted,
        'grey-text': this.entriesSubmitted,
        'text-lighten-2': this.entriesSubmitted,
        'deep-orange': !this.entriesSubmitted,
        'lighten-2': !this.entriesSubmitted
      }
    },
    entryIsNotEmpty () {
      return this.entry != null
    }
  },
  methods: {
    userMsg (content, type) {
      this.msg = content ? { content, type } : null
    },
    addEntry () {
      this.newEntry = this.newEntry.trim()
      if (this.newEntry === '' && this.entriesCount > 3) {
        this.submitEntries()
      }
      if (this.newEntry && this.entryIsUnique) {
        this.entries.push(this.newEntry)
        this.newEntry = ''
      }
    },
    removeEntry (index) {
      this.entries.splice(index, 1)
    },
    submitEntries () {
      this.entriesSubmitted = true
      this.$nextTick(() => this.$refs.title.focus()) // this works, but why exactly?
    },
    createList () {
      console.log('user before update', this.user)
      db.collection('lists')
        .add({
          title: this.title,
          entries: this.entries,
          createdOn: Date.now(),
          creatorId: this.user.userId,
          creatorUsername: this.user.username
        })
        .then(listRef => {
          this.user.access.push(listRef.id)
          db.collection('users').where('userId', '==', this.user.userId).get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection('users').doc(doc.id)
                  .update(this.user)
                  .then(() => {
                    this.$router.push({ name: 'Home' })
                  })
                  .catch(err => {
                    console.log(err.message)
                  })
              })
            })
            .catch(err => {
              console.log(err.message)
            })
        })
    }
  },
  created () {
    // can't just land at this route if not logged in
    if (!this.$route.params.user) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="css">
  .createlist {
    margin-top: 90px;
  }

  .createlist .back-btn {
    cursor: pointer;
    margin-top: 20px;
  }

  .createlist input[type="text"] {
    color: white;
    display: inline-block;
    margin-right: 15px;
  }

  .createlist .remove {
    cursor: pointer;
  }

  .createlist .title {
    margin-bottom: 3em;
  }

  .createlist .card {
    background: #555;
    border-radius: 3%;
  }

  .createlist .card-content {
    background: #555;
  }

  .createlist .collection {
    border-radius: 3%;
  }

  .createlist .add-item {
    font-size: 2em;
    cursor: pointer;
  }

</style>

/*
  notes

  -do validation
    -limit to 10-12 items?

  -on submit
    -create list object
    -need a list class (proper place for this?)
    -attach new list object to user
    -new list will be accessible via url by anyone with link :username/:listname

  -change route to include userid param
    -pass as prop or route param?

  -styles
    -punch up with css transitions
 */
