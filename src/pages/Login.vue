<template>
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <div class="container mt-4">
    <form class="form-signin" @submit.prevent="login">
      <h2 v-if="wrongCredentials" class="alert alert-danger">wrong credentials</h2>
      <h2 class="form-signin-heading">Please login</h2>
      <input v-model="email" type="text" class="form-control" name="email" placeholder="Email Address" required autofocus />
      <input v-model="password" type="password" class="form-control" name="password" placeholder="Password" required />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>
  </div>
  </div>
</div>
</template>

<script>

import { authService } from '../services/Auth'

	export default {
		data() {
			return {
				email: '',
				password: '',
				wrongCredentials: false
			}

		},
		methods: {
			login(){
				authService.login(this.email, this.password)
				.then(()=>{
				this.$eventHub.$emit('logged-in');
				this.$router.push({ name: 'galleries'}) //ovo treba promeniti
				}).catch((error)=>{
					console.log(error)
					this.wrongCredentials = true
				})
			}
		}
	}
</script>

