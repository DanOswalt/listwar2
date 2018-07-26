<template>
  <transition name="pop">
    <div class="user-msg center-align" :class="msg.type">
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
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 20px auto;
    color: #eee;
    font-size: 1.2em;
    font-family: courier;
  }

  .info {
    background-color: #333;
    color: #ff7043;
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
