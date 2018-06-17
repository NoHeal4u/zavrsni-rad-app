import Vue from 'vue'

import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Galleries from '../pages/Galleries.vue'
import Gallery from '../pages/Gallery.vue'
import Author from '../pages/Author.vue'
import NewGallery from '../pages/NewGallery.vue'
import MyGalleries from '../pages/MyGalleries.vue'
import EditGallery from '../pages/EditGallery.vue'

import { requiresAuth , guestOnly} from './guards'


Vue.use(VueRouter)

const routes = [
   { path: '/', redirect: '/galleries' },
   {path: '/login', component:Login, name: 'login', meta: {guestOnly:true}},
   {path: '/register', component:Register, name: 'register', meta: {guestOnly:true}},
   {path: '/galleries', component:Galleries, name: 'galleries', meta: {requiresAuth:true}},
   {path: '/galleries/:id', component:Gallery, name: 'gallery', meta: {requiresAuth:true}},
   {path: '/authors/:id', component:Author, name: 'author', meta: {requiresAuth:true}},
   {path: '/my-galleries', component:MyGalleries, name: 'my-galleries', meta: {requiresAuth:true}},
   {path: '/create', component:NewGallery, name: 'new-gallery', meta: {requiresAuth:true}},
   {path: '/edit-gallery/:id', component:EditGallery, name: 'edit-gallery', meta: {requiresAuth:true}}

]
  


const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
    Promise.resolve(to)
      .then(requiresAuth)
      .then(guestOnly)
      .then(() => {
        next()
      })
      .catch(redirect => {
        next(redirect)
      })
  })


export default router 