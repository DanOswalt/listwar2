<template lang="html">
  <div class="createlist">
    <header class="title">
      <h4 v-if="!entriesSubmitted" class="center-align teal-text text-darken-4">Create a new list</h4>
      <h4 v-else class="center-align teal-text text-darken-4">Give it a title!</h4>
    </header>

    <!-- form row -->
    <div class="row">
      <form v-show="entriesSubmitted" @submit.prevent="createList" class="col s12 m6 offset-m3 l4 offset-l4">
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

      <form @submit.prevent="addEntry" class="col s12 m6 offset-m3 l4 offset-l4">
        <div v-if="!entriesSubmitted" class="row">
          <div class="input-field">
            <input id="entryInput"
                   type="text"
                   v-model="newEntry"
                   autofocus>
            <label for="entry">Enter new item:</label>
          </div>
        </div>
        <div class="row">
          <ul v-show="entries.length > 0" class="entries-list collection">
            <li v-for="(entry, index) in entries"
                :key="index"
                class="collection-item"
                :class="entryClasses">{{ entry }}
                <i v-if=!entriesSubmitted @click="removeEntry(index)" class="material-icons right remove grey-text">highlight_off</i>
            </li>
          </ul>
        </div>
      </form>

      <!-- submit button row -->
      <div class="row center-align">
        <div v-if="!entriesSubmitted" class="col s12">
          <div v-if="entriesCount >= 4" @click.prevent="submitEntries" class="btn orange darken-4">
            <i class="material-icons right">arrow_right</i>{{ entriesCount }} entries go {{ roundCount }} rounds
          </div>
          <div v-else class="btn disabled">Enter some more items</div>
        </div>

        <div v-if="entriesSubmitted" class="col s12">
          <button class="btn orange darken-4" :class="{ disabled: !title }" @click="createList">Save List</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateList',
  data () {
    return {
      newEntry: '',
      title: '',
      entries: [],
      entriesSubmitted: false
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
    entryClasses () {
      return {
        teal: this.entriesSubmitted,
        'white-text': this.entriesSubmitted,
        'teal-text': !this.entriesSubmitted,
        'text-darken-4': !this.entriesSubmitted
      }
    }
  },
  methods: {
    addEntry () {
      if (this.newEntry) {
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
      console.log(this.title, this.entries)
    }
  }
}
</script>

<style lang="css">
  .createlist .remove {
    cursor: pointer;
  }

  .createlist .title {
    margin-bottom: 3em;
  }

</style>

/*
  notes

  -do validation
    -strings must be unique
    -strings must be trimmed
    -strings must be non-blank
    -must have at least 4 items
    -limit to 10-12 items?

  -on submit
    -ask for title after clicking submit
    -create list object
    -need a list class (proper place for this?)
    -attach new list object to user
    -new list will be accessible via url by anyone with link :username/:listname

  -change route to include userid param
    -pass as prop or route param?

  -styles
    -punch up with css transitions
 */
