import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import CreateList from '@/components/views/CreateList'
import Register from '@/components/auth/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/createlist',
      name: 'CreateList',
      component: CreateList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
