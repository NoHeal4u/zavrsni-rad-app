<template>
	

<div class="card" style="width: 18rem;">
  <div class="card-body">
    <form class="form-horizontal" @submit.prevent="addNewGallery" >
  <div class="form-group">
    <label for="gallery_name" class="control-label col-xs-4">Gallery Name</label> 
    <div class="col-xs-8">
      <input 
      v-model="newGallery.gallery_name"
      placeholder="My gallery" 
      class="form-control" 
       
      type="text">
    </div>
  </div>
  <div class="form-group">
    <label for="description" class="control-label col-xs-4">Description</label> 
    <div class="col-xs-8">
      <input 
      v-model="newGallery.description"
      placeholder="Flowers and birds" 
      class="form-control"  
      type="text">
    </div>
  </div>
  <div>
  	<button  class="btn btn-sml" @click.prevent="addNewImageInput" >Add more images</button>
    <div class="form-group"
    	v-for="(images, index) in newGallery.images">
    <label for="description" class="control-label col-xs-4">Add image (index: {{ index }} )</label> 
    <div class="col-xs-8">
      <input 
      v-model="images.image"
      placeholder="Image URL" 
      class="form-control"  
      type="url">
    </div>
  </div>
  </div>
  <div class="form-group row">
    <div class="col-xs-offset-4 col-xs-8">
      <button name="submit" type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
  </div>
</div>
</template>


<script>

import { galleries } from '../services/Galleries'

	export default {
		data(){
			return{
				newGallery : {
					gallery_name: '',
					description: '',
					images : []
					
				},
				arrayStrings: []
			}
		},
		methods: {
			addNewImageInput(){
				this.newGallery.images.push({image:''})

				// imagesIntoString(){
				// 	this.arrayStrings = this.newGallery.images.map(function (obj) 
				// 	{
  		// 			return obj.image;
				// 	})
			 //    }
				console.log(this.newGallery)
			},
			addNewGallery(){
				

				galleries.add(this.newGallery)
					.then((response)=>{
          				this.galleries = response.data
          				console.log(this.galleries)
          
        			})
        				.catch((error)=>{
          				console.log(error)

        				})
			}
		}
   }
</script>

