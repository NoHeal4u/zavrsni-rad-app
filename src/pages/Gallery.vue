<template>
<div>
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{ gallery.gallery_name}}</h5>
    <p class="card-text">Author: {{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
    <p class="card-text">Creation date: {{ gallery.created_at }} </p>
    <p class="card-text">Description: {{ gallery.description }} </p>
  </div>
</div>
</div>
</template>

<script>

import { galleries } from '../services/Galleries'

	export default {
		
		data(){
			return {
				gallery:[]
			}
		},


		created() {
			galleries.get(this.$route.params.id)
			.then((response) => {
				this.gallery = response.data
				console.log(this.gallery)
			}).catch((error)=>{
				console.log(error)
			})
		}


	}

</script>