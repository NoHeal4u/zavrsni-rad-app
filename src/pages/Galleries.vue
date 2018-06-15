<template>
<div>
	<div class="navbar-nav">
	<input class="nav-item nav-link" type="text" v-model="search" placeholder="search galleries">
    </div>
<div v-if="filteredGalleries.length != 0">
<div v-for="gallery in filteredGalleries" class="card" style="width: 18rem;">
  <img class="card-img-top" v-bind:src="gallery.gallery_has_one_image.images" alt="Card image cap">
  <div class="card-body">
    <p>Gallery title:</p>
    <router-link class="btn btn-primary" :to="{ name: 'gallery', params: { id: gallery.id }}">{{ gallery.gallery_name}}
    </router-link>
    <p>Gallery Author:</p>
    <router-link class="btn btn-primary" :to="{ name: 'author', params: { id: gallery.user.id }}">{{ gallery.user.first_name }} {{ gallery.user.last_name }}
    </router-link>
    <!-- <p class="card-text">Author: {{ gallery.user.first_name }} {{ gallery.user.last_name }}</p> -->
    <p class="card-text">Creation date: {{ gallery.created_at }} </p>
  </div>
</div>
</div>
<div v-else>
	<p>There are no galleries in database</p>
</div>

</div>
</template>

<script>

import { galleries } from '../services/Galleries'

	export default {
		
		data(){
			return {
				galleries:[],
				search: ''
				
			}
		},


		created() {
			galleries.getAll()
			.then((response) => {
				this.galleries = response.data
				console.log(this.galleries)
			}).catch((error)=>{
				console.log(error)
			})
			
		},

		computed:{
			filteredGalleries: function(){
				return this.galleries.filter((gallery)=> {
					return gallery.gallery_name.match(this.search)

				})
			}
		}


	}

</script>