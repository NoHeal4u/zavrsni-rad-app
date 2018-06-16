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
</div>

<!-- <img v-for="image in images" v-bind:src="image.images"> -->
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
		},
		methods: {
			openInNewTab(link){
				window.open(link, '_blank')
			}
		}


	}

</script>