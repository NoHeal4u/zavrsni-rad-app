<template>
<div>
	Ovo je galleries
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