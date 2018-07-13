import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import CreateList from '@/components/views/CreateList'
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
import War from '@/components/views/War'

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/war/:creator/:title',
      name: 'War',
      component: War
    }
  ]
})
