import Vue from 'vue'

import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Galleries from '../pages/Galleries.vue'

Vue.use(VueRouter)

const routes = [
   { path: '/', redirect: '/login' },
   {path: '/login', component:Login, name: 'login'},
   {path: '/register', component:Register, name: 'register'},
   {path: '/galleries', component:Galleries, name: 'galleries'},
  
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router 