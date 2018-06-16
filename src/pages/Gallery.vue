<template>
<div>
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{ gallery.gallery_name}}</h5>
    <p class="card-text" >Author:</p>
    <router-link class="card-text" :to="{ name: 'author', params: { id: gallery.user.id }}"> {{ gallery.user.first_name }} {{ gallery.user.last_name }}
    </router-link>
    <p class="card-text">Creation date: {{ gallery.created_at }} </p>
    <p class="card-text">Description: {{ gallery.description }} </p>
  </div>
</div>
<div class="card" style="width: 18rem;">
	<b-carousel id="carousel1"
            style="text-shadow: 1px 1px 2px #333;"
            controls
            indicators
            background="#ababab"
            :interval="4000"
             >
      <!-- Text slides with image -->
    <b-carousel-slide 
      v-for="image in gallery.gallery_has_many_images"
      

      ><img 
      slot="img" 
      class="d-block img-fluid w-100" 
      width="562" 
      height="240"
      v-bind:src="image.images" 
      alt="image slot"
      v-on:click="openInNewTab(image.images)"
        ></b-carousel-slide>
</b-carousel>
<button v-if="mineGallery" @click.prevent="deleteGallery">Delete</button>
</div>

<!-- <img v-for="image in images" v-bind:src="image.images"> -->
</div>
</template>

<script>

import { galleries } from '../services/Galleries'

	export default {
		
		data(){
			return {
				gallery:[],
				mineGallery: false,
				loggedUser: '',
				currentUserId: ''
				
			}
		},


		created() {
			// this.loggedUser = window.localStorage.getItem('userId')

			galleries.get(this.$route.params.id)
			.then((response) => {
				this.gallery = response.data
				this.currentUserId = this.gallery.user_id.toString()
				this.loggedUser = JSON.stringify(window.localStorage.getItem('userId'))
				// console.log(this.gallery)
			}).catch((error)=>{
				console.log(error)
			})

			 // this.loggedUser = JSON.stringify(window.localStorage.getItem('userId'))
      		 // console.log(this.loggedUser)
    //   			if (window.localStorage.getItem('userId') == this.currentUserId) {
				// 	this.loggedUser = true
				// } this.loggedUser = false
      		// if (this.loggedUser === this.gallery.user_id) {


      		if ( this.loggedUser === this.currentUserId) {
					this.mineGallery = true
				}else { this.mineGallery = false }
		},
		methods: {
			openInNewTab(link){
				window.open(link, '_blank')
				// console.log(this.isThisGalleryMine)
				

				// console.log(typeof this.currentUserId)
				// console.log(typeof window.localStorage.getItem('userId'))
				// console.log(this.mineGallery)
			}
		},
		// computed:{
		// 	isThisGalleryMine : function (){
		// 		if (window.localStorage.getItem('userId') === this.gallery.user_id) {
		// 			return true
		// 		} return false
		// 	}

		// }


	}

</script>