<template lang="html">
  <div class="createlist container">
    <header>
      <h3 class="center-align">Create a new list</h3>
    </header>
    <div class="row">
      <form @submit.prevent="addEntry" class="col s12 m6 offset-m3">
        <div class="row">
          <div class="input-field">
            <input id="entryInput"
                   type="text"
                   @keydown.tab.prevent="addEntry"
                   v-model="newEntry"
                   autofocus>
            <label for="entry">Enter new item</label>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p>{{ entries.length }} items = {{ this.battleCount }} battles</p>
          </div>
        </div>
        <div class="row">
          <ul v-show="entries.length > 0" class="entries-list collection">
            <li v-for="(entry, index) in entries"
                :key="index"
                class="collection-item">{{ entry }}
                <i @click="removeEntry(index)" class="material-icons right remove">highlight_off</i>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateList',
  data () {
    return {
      newEntry: '',
      entries: []
    }
  },
  computed: {
    entriesCount () {
      return this.entries.length
    },
    battleCount () {
      let count = 0
      for (let i = 0; i < this.entriesCount; i++) {
        count += i
      }
      return count
    }
  },
  methods: {
    addEntry () {
      this.entries.push(this.newEntry)
      this.newEntry = ''
    },
    removeEntry (index) {
      this.entries.splice(index, 1)
    }
  }
}
</script>

<style lang="css">
  .createlist .remove {
    cursor: pointer;
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
