<template>
  <transition name="pop">
    <div class="user-msg z-depth-2 center-align" :class="msg.type">
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
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0 auto;
    color: #eee;
    font-size: 1.2em;
  }

  .info {
    background-color: teal;
  }

  .warn {
    background-color: orange;
  }

  .error {
    background-color: #ef3413;
  }

  .hide {
    visibility: hidden;
  }

  .pop-enter-active, .pop-leave-active {
    transition: opacity 0.2s ease-out;
    transition: transform 0.2s ease-out;
  }

  .pop-enter, .pop-leave-to {
    opacity: 0;
    transform: scale(0.3, 1)
  }
</style>
