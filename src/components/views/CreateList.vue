<template lang="html">
  <div class="createlist container">
    <header>
      <h3 class="center-align">Create a new list</h3>
    </header>
    <div class="row">
      <form @submit.prevent="addEntry" class="col s8 offset-s2">
        <div class="row">
          <div class="input-field">
            <input type="text" id="entry" v-model="newEntry" autofocus>
            <label for="entry">Enter items</label>
          </div>
        </div>
        <div class="row">
          <ul class="entries-list collection">
            <li v-for="(entry, index) in entries"
                :key="index"
                class="collection-item">{{ entry }}
                <i @click="removeEntry(index)" class="material-icons red-text right remove">remove_circle_outline</i>
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
  methods: {
    addEntry: function () {
      this.entries.push(this.newEntry)
      this.newEntry = ''
    },
    removeEntry: function (index) {
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
