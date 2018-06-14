<template>
<div>
<h2>{{ user.first_name }} {{ user.last_name }}'s galleries</h2>
<div v-if="user != null">
<div v-for="gallery in user.user_has_many_galleries" class="card" style="width: 18rem;">
  <img class="card-img-top" v-bind:src="gallery.gallery_has_one_image.images" alt="Card image cap">
  <div class="card-body">
  <p>Gallery name:</p>
    <router-link class="btn btn-primary" :to="{ name: 'gallery', params: { id: gallery.id }}">{{ gallery.gallery_name}}
    </router-link>
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

import { authors } from '../services/Author'

	export default {
		
		data(){
			return {
				user:[]
			}
		},


		created() {
			authors.get(this.$route.params.id)
			.then((response) => {
				this.user = response.data
				console.log(this.user)
			}).catch((error)=>{
				console.log(error)
			})
		}


	}

</script>