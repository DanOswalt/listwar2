// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import moment from 'moment'
import VueVisible from 'vue-visible'

Vue.use(VueVisible)

Vue.config.productionTip = false

Vue.prototype.moment = moment

let app = null

// wait for firebase auth init before starting the app creation

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
