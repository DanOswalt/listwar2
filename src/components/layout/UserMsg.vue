<template>
  <transition name="fade">
    <div v-if="msg" class="user-msg z-depth-4" :class="msg.type">
      {{ msg.content }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UserMsg',
  props: [
    'msg'
  ],
  data () {
    return {}
  }
}
</script>

<style>
  .user-msg {
    max-width: 50%;
    padding: 10px;
    border-radius: 5px;
    margin: 0 auto;
  }

  .info {
    background-color: teal;
    color: #eee;
  }

  .warn {
    background-color: orange;
    color: #eee;
  }

  .error {
    background-color: red;
    color: #eee;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
