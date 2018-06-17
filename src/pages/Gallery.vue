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
<router-link v-if="mineGallery" class="btn btn-primary" :to="{ name: 'edit-gallery', params: { id: gallery.id }}">Edit
    </router-link>
<button v-if="mineGallery" @click.prevent="deleteGallery">Delete</button>
</div>
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title"> Comments </h5>
    <div v-for="comment in comments">
    	<div>
    		<p class="card-text" >Author:</p>
    		<p class="card-text" >{{comment.user.first_name}} {{comment.user.last_name}}</p>
    		<p class="card-text">Comment creation date: {{ comment.created_at }} </p>
    		<p class="card-text">Comment: {{ comment.comment }} </p>
    		<button id="comment.id" @click.prevent="deleteComment(comment.id)" class="btn btn-primary" v-if="loggedUser == stringCommentUserId(comment.user_id)">Delete</button>
    	</div>
    </div>
    <div>
  

  <form class="form-horizontal"  @submit.prevent="addComment">
  <div class="form-group">
    <label for="first_name" class="control-label col-xs-4">Type your comment</label> 
    <div class="col-xs-8">
      <span v-show="errors.has('Comment')" style="color:red;" >{{ errors.first('Comment') }}</span>
      <br>
      <input 
      v-validate="{ required: true, max : 1000}"
      name="Comment" 
      v-model="newComment.comment" 
      class="form-control" 
      required="required" 
      type="textarea">
    </div>
  </div>
  <div class="form-group row">
    <div class="col-xs-offset-4 col-xs-8">
      <button v-bind:disabled="errors.any()" name="submit" type="submit" class="btn btn-primary">Add Comment</button>
    </div>
  </div>
</form>
    </div>
    
  </div>
</div>

</div>
</template>

<script>

import { galleries } from '../services/Galleries'
import { comments } from '../services/Comment'

	export default {
		
		data(){
			return {
				gallery:[],
				mineGallery: false,
				mineComment: false,
				loggedUser: '',
				currentUserId: '',
				comments: [],
				newComment: {
					comment: '',
					gallery_id: ''
				}
				
			}
		},


		created() {
			// this.loggedUser = window.localStorage.getItem('userId')

			galleries.get(this.$route.params.id)
			.then((response) => {
				console.log(response.data)
				this.gallery = response.data.gallery
				this.comments = response.data.comments
				this.currentUserId = this.gallery.user_id.toString()
				this.loggedUser = window.localStorage.getItem('userId')
				console.log(this.gallery)
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


    //   		if ( this.loggedUser == this.currentUserId) {
				// 	this.mineGallery = true
				// }else { this.mineGallery = false }
		},
		methods: {
			openInNewTab(link){
				window.open(link, '_blank')
				// console.log(this.isThisGalleryMine)
				

				// console.log(this.currentUserId)
				// console.log(this.loggedUser)
				// console.log(this.mineGallery)
			},
			deleteGallery(){
				if (confirm("Confirm deletion!")) {
    				galleries.remove(this.gallery.id)
    				.then((response) => {
    					console.log(response.data)
    				})
    				.then(()=>{
        				this.$router.push({ name: 'my-galleries'}) 
        			})
    				.catch((error)=>{
						console.log(error)
					})

				} 
			},
			addComment(){
				this.newComment.gallery_id = this.gallery.id
				comments.add(this.newComment)
					.then((response)=>{
          				this.galleries = response.data
          				console.log(this.galleries)
          
        			})
        				.catch((error)=>{
          				console.log(error)

        				}).then(()=>{
        					// this.$router.push({ name: 'gallery', params: { id: `${this.gallery.id}` } }) //ovo treba promeniti
        					this.$router.go(this.$router.currentRoute)
        				})

			},
			stringCommentUserId(element){
				return element.toString()
			},
			deleteComment(id){
					comments.remove(id)
					.then((response)=>{
						console.log(response.data)
					})
					.catch((error)=>{
						console.log(error)
					})
					.then(()=>{
        					
        					this.$router.go(this.$router.currentRoute)
        				})
			}

		},
		
		updated: function () {
  					this.$nextTick(function () {
	    				if ( this.loggedUser == this.currentUserId) {
							this.mineGallery = true
						}else { this.mineGallery = false }

						// if ( this.loggedUser == this.currentUserId) {
						// 	this.mineGallery = true
						// }else { this.mineGallery = false }
  					})
				}	
		


	}

</script>