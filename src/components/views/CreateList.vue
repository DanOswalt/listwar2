<template lang="html">
  <div class="createlist container">
    <header class="title">
      <div class=row>
        <div class="col s1">
          <i @click="$router.go(-1)" class="material-icons left medium back-btn hoverable grey-text lighten-2">chevron_left</i>
        </div>
        <div class="col s10">
          <h3 class="center-align grey-text text-lighten-2">Create a new list</h3>
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
                    <ul v-show="entries.length > 0" class="entries-list collection z-depth-3" :class="{ 'z-depth-0': entries.submitted }">
                      <li v-for="(entry, index) in entries"
                          :key="index"
                          class="collection-item white-text"
                          :class="entryClasses">{{ entry.value }}
                          <i v-if=!entriesSubmitted @click="removeEntry(index)" class="material-icons right remove grey-text text-darken-2">highlight_off</i>
                      </li>
                    </ul>
                  </div>
                </form>

                <!-- submit button row -->
                <div class="row center-align">
                  <div v-if="!entriesSubmitted" class="col s12">
                    <div v-show="entriesCount >= 4" @click.prevent="submitEntries" class="btn teal darken-4">
                      <i class="material-icons right">arrow_right</i>{{ entriesCount }} entries, {{ roundCount }} rounds
                    </div>
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
        content: '',
        type: 'hide'
      },
      list: null
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
      return !this.entries.find(entry => {
        return entry.value === this.newEntry
      })
    },
    entryClasses () {
      return {
        'teal': this.entriesSubmitted,
        'darken-4': this.entriesSubmitted,
        'grey-text': this.entriesSubmitted,
        'text-lighten-2': this.entriesSubmitted,
        'grey': !this.entriesSubmitted,
        'darken-3': !this.entriesSubmitted
      }
    },
    entryIsNotEmpty () {
      return this.entry != null
    }
  },
  methods: {
    userMsg (content, type) {
      this.msg = content ? { content, type } : { content: '', type: 'hide' }
    },
    addEntry () {
      this.newEntry = this.newEntry.trim()
      if (this.newEntry === '' && this.entriesCount > 3) {
        this.userMsg('Tap enter to submit.', 'info')
        this.submitEntries()
      } else if (this.newEntry && this.entryIsUnique) {
        this.userMsg()
        this.entries.push({ value: this.newEntry })
        this.newEntry = ''
      } else if (this.newEntry === '') {
        this.userMsg('Nothing entered...', 'error')
      } else {
        this.userMsg('Enter a unique entry.', 'error')
      }
    },
    removeEntry (index) {
      this.userMsg('item removed', 'info')
      this.entries.splice(index, 1)
    },
    submitEntries () {
      this.userMsg('Enter a title!', 'info')
      this.entriesSubmitted = true
      this.$nextTick(() => this.$refs.title.focus()) // this works, but why exactly?
    },
    createList () {
      this.list = {
        title: this.title,
        entries: this.entries,
        createdOn: Date.now(),
        creatorId: this.user.userId,
        creatorUsername: this.user.username,
        completedBy: []
      }

      // anonymous users go straight to war page without saving list
      if (this.username === 'anonymous') {
        this.$router.push({
          name: 'List',
          params: {
            listId: 'anon',
            title: this.list.title,
            list: this.list,
            user: this.user
          }
        })

      // logged in users go back to home page after saving
      } else {
        db.collection('lists')
          .add(this.list)
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
                      this.userMsg(err.message, 'error')
                    })
                })
              })
              .catch(err => {
                this.userMsg(err.message, 'error')
              })
          })
      }
    }
  },
  created () {
    // if no user logged in, create null user
    if (!this.$route.params.user) {
      this.user = {
        userId: null,
        username: 'anonymous',
        access: [],
        lists: []
      }
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
