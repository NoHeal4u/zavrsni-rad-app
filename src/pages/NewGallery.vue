<template>
	

<div class="card" style="width: 28rem;">
  <div class="card-body">
    <form class="form-horizontal" @submit.prevent="addNewGallery" >
  <div class="form-group">
  	

    <label for="gallery_name" class="control-label col-xs-4">Gallery Name</label>
    <br>
    <span v-show="errors.has('gallery_name')" style="color:red;" >{{ errors.first('gallery_name') }}</span>
    <br>
    <div class="col-xs-8">

      <input 
      v-model="newGallery.gallery_name"
      placeholder="My gallery" 
      class="form-control" 
      v-validate="{ required: true, min: 2, max: 255 }"
      name="gallery_name"
      type="text">

    </div>
  </div>
  <div class="form-group">
    <label for="description" class="control-label col-xs-4">Description</label> 
    <br>
    <span v-show="errors.has('gallery_description')" style="color:red;" >{{ errors.first('gallery_description') }}</span>
    <br>
    <div class="col-xs-8">
      <input 
      v-model="newGallery.description"
      placeholder="Flowers and birds" 
      class="form-control"
      name="gallery_description"
      v-validate="{ max: 1000 }" 
      type="text"
      >


    </div>
  </div>
  <div>
  	<button  class="btn btn-sml" @click.prevent="addNewImageInput" >Add more images</button>
  	<p v-if="notifyOneImage" class="alert alert-danger" >You must post at least one image</p>
  	
  		
    <div class="form-group"
    	v-for="(images, index) in newGallery.images">
    
    <div class="col-xs-8">
    	<br>
    	<span v-show="errors.has('image_' + newGallery.images[index].id)" style="color:red;">{{ errors.first('image_' + newGallery.images[index].id) }}</span>
    	<span v-show="errors.has('gallery_image')" style="color:red;" >{{ errors.first('gallery_image') }}</span>
    	<br>
    	<div class="form-group row">
    	<label for="description" class="control-label col-xs-4">Image: {{ index }} </label> 
      <input 
      :key="newGallery.images.id"
      autofocus
      v-model="images.image"
      placeholder="Image URL" 
      class="form-control"
      :name="'image_' + newGallery.images[index].id"
      v-validate="{ required: true,  url , regex: /(?:(?:(?:\.jpg))|(?:(?:\.jpeg))|(?:(?:\.png)))/ }"
      required 
      >
       <button  class="btn btn-sml" @click.prevent="removeImage(index)" >Remove image</button>
       <button  class="btn btn-sml" @click.prevent="moveUp(index)" >Move image up</button>
       <button  class="btn btn-sml" @click.prevent="moveDown(index)" >Move image down</button>
    </div>
   
    </div>
  </div>
  

  </div>
  <div class="form-group row">
    <div class="col-xs-offset-4 col-xs-8">
    	
      		<button v-bind:disabled="errors.any() || !isComplete" name="submit" type="submit" class="btn btn-primary">Submit</button>
      		<button name="submit" @click.prevent="cancel" class="btn btn-primary">Cancel</button>
      	
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
				notifyOneImage : false,
				arrayStrings: [],
				loggedUser : '',
				id: 0
			}
		},
		methods: {
			addNewImageInput(){
				this.newGallery.images.push({id: this.id++, image:''})
				// this.inputs.push({ id: this.id++, username: null });
				console.log(this.newGallery)
			
			},
			addNewGallery(){
				
				this.newGallery.images = this.newGallery.images.map(function (obj) 
					{
  					return obj.image;
  					
					})
				console.log(this.newGallery)
				galleries.add(this.newGallery)
					.then((response)=>{
          				this.galleries = response.data
          				console.log(this.galleries)
          
        			})
        				.catch((error)=>{
          				console.log(error)

        				}).then(()=>{
        					this.$router.push({ name: 'my-galleries' }) //ovo treba promeniti
        				})
			},
			removeImage(index){
				if (Object.keys(this.newGallery.images).length > 1){
					this.newGallery.images.splice(index, 1)
				}else{
					this.notifyOneImage = true
				}
				
			},
			moveUp(index){
				if (index !=0) {	
					this.newGallery.images.splice(index-1, 0, this.newGallery.images[index])
					this.newGallery.images.splice(index+1,1)		
				}
			},
			moveDown(index){
				if(index != this.newGallery.images.length-1){
					this.newGallery.images.splice(index+2, 0, this.newGallery.images[index])
					this.newGallery.images.splice(index,1)
				}
			},
			cancel(){
				this.$router.push({ name: 'my-galleries' })
			}
		},
		computed: {
  			isComplete: function () {
    			return this.newGallery.gallery_name &&  Object.keys(this.newGallery.images).length != 0 

    			// this.newGallery.images.constructor != Object;
  			},
		}
   }
</script>

<!-- v-validate="{ required: true,  url , regex: /(?:(?:(?:\.jpg))|(?:(?:\.jpeg))|(?:(?:\.png)))/ }"  -->