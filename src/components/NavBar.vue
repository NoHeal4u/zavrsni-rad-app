<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Gallery App</router-link>
    <div class="navbar-nav">
      <router-link class="nav-item nav-link" to="/galleries">All Galeries</router-link>
      <router-link class="nav-item nav-link" to="/register" v-if="!isAuthenticated" >Register</router-link>
      <router-link class="nav-item nav-link" to="/login" v-if="!isAuthenticated" >Login</router-link>
      <router-link class="nav-item nav-link" to="/create" v-if="isAuthenticated" >Create new gallery</router-link>
      <router-link class="nav-item nav-link" to="/my-galleries" v-if="isAuthenticated" >My Galleries
      </router-link>
      <a href="#" class="nav-item nav-link" @click="logout" v-if="isAuthenticated">Logout</a>
    </div>
  </nav>
</template>

<script>
  import { authService } from '../services/Auth'
  export default {
    data() {
      return {
        isAuthenticated: authService.isAuthenticated(),
        loggedUser:''
      }
    },
    created(){
      // this.loggedUser = window.localStorage.getItem('userId')
      // console.log(JSON.stringify(this.loggedUser))
      // authService.isAuthenticated()
      this.$eventHub.$on('logged-in', this.getCurrentUser);
    },
    beforeDestroy() {
      this.$eventHub.$off('logged-in');
    },

    methods: {
      logout() {
        authService.logout()
        this.isAuthenticated = false
        this.$router.push({ name: 'login' })
      },
      getCurrentUser(){
        this.isAuthenticated = authService.isAuthenticated()
      }
    }
  }
</script>