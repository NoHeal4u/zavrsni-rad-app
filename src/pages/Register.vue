<template>
	

<div class="card" style="width: 18rem;">
  <div class="card-body">
    <form class="form-horizontal"  @submit.prevent="addUser">
  <div class="form-group">
    <label for="first_name" class="control-label col-xs-4">First name</label> 
    <div class="col-xs-8">
      <input 
      v-model="newUser.first_name"
      placeholder="John" 
      class="form-control" 
      required="required" 
      type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="last_name" class="control-label col-xs-4">Last name</label> 
    <div class="col-xs-8">
      <input 
      v-model="newUser.last_name"
      placeholder="Doe" 
      class="form-control" 
      required="required" 
      type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="email" class="control-label col-xs-4">Email</label> 
    <div class="col-xs-8">
      <input 
      v-model="newUser.email"
      placeholder="JohnDoe@gmail.com" 
      class="form-control" 
      required="required" 
      type="email">
    </div>
  </div>
  <div class="form-group">
    <p v-if="validationFailedConfirmation" class="alert alert-danger">password must be at least 8 characters long and it must contain at least one number</p>
    <label for="password" class="control-label col-xs-4">Password</label> 
    <div class="col-xs-8">
      <input 
      
      v-model="newUser.password" 
      placeholder="*********" 
      class="form-control" 
      required="required" 
      type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="confirm_password" class="control-label col-xs-4">Confirm Password</label> 
    <div class="col-xs-8">
      <input 
      v-model="newUser.password_confirmation" 
      placeholder="**********" 
      class="form-control" 
      required="required" 
      type="password">
    </div>
  </div>
  <div class="form-group">
    <label for="accept_terms_and_conditions" class="control-label col-xs-4">You need to accept terms and conditions in order to register</label> 
    <div class="col-xs-8">
      <label class="checkbox-inline">
        <input 
        v-model="newUser.accepted_terms_and_conditions"
        value="true" 
        required="required"
        type="checkbox">
              I accept terms and conditions
      </label> 
    </div>
  </div> 
  <div class="form-group row">
    <div class="col-xs-offset-4 col-xs-8">
      <button name="submit" type="submit" class="btn btn-primary">Register</button>
    </div>
  </div>
</form>
  </div>
</div>
</template>


<script>

import { authService } from '../services/Auth'
import { register } from '../services/Register'

	export default {
		data(){
			return{
				newUser : {
					first_name: '',
					last_name: '',
					accepted_terms_and_conditions: '',
					email: '',
					password: '',
					password_confirmation: '',
				},

        error:[],
        validationFailedConfirmation : false
			}
		},

		methods: {
			addUser(){

        if(this.newUser.password === this.newUser.password_confirmation & this.newUser.password.length >=8){
        register.registerUser(this.newUser)
        .then((response)=>{
          this.register = response.data
          console.log(this.register)
          // this.error = response.data
          // console.log(this.error)
        })
        .catch((error)=>{
          console.log(error)

        })

       
        authService.login(this.newUser.email, this.newUser.password)
        .then(()=>{
        this.$router.push({ name: 'galleries'}) //ovo treba promeniti
        })
      }else{this.validationFailedConfirmation = true}
      }
		},
    // computed:{
    //   validationCheck: function(){
    //      // if (this.error.succes = false) {
    //      //  return
    //      // }
    //      if (this.password != this.password_confirmation) {
    //       return this.validationFailed = true
    //      }else{
    //       return validationFailed = false
    //      }
    //   }
    // }



	}
</script>

