<template>
<div>
<div v-if="galleries != null">
<div v-for="gallery in galleries" class="card" style="width: 18rem;">
  <img class="card-img-top" v-bind:src="gallery.gallery_has_one_image.images" alt="Card image cap">
  <div class="card-body">
    <!-- <h5 class="card-title">{{ gallery.gallery_name}}</h5> -->
    <router-link class="card-title" :to="{ name: 'gallery', params: { id: gallery.id }}">{{ gallery.gallery_name}}
    </router-link>
    <p class="card-text">Author: {{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
    <p class="card-text">Creation date: {{ gallery.created_at }} </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
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
				galleries:[]
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
		}


	}

</script>