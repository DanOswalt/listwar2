<template>
  <transition name="pop">
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

  .pop-enter-active, .pop-leave-active {
    transition: opacity 0.3s ease-out;
    transition: transform 0.3s ease-out;
  }

  .pop-enter, .pop-leave-to {
    opacity: 0;
    transform: scale(0.3, 1)
  }
</style>
