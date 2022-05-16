<template>
  <BaseCard>
  <div>
<label for="'search>"><h1>Szukaj filmu</h1></label>
<input type="search" id="search" placeholder="Search Movie Title" 
v-model.trim="searchTitle" @input="searchResult" />
</div>
  </BaseCard>
</template>


<script>
import BaseCard from '../UI/BaseCard.vue';
export default{
props:['title'],
emits:['find-movie'],
data(){
    return{
    searchTitle:'',
    searchMovie:null,
}},
components:{
    BaseCard,
},
methods:{ 
  searchResult(){         
     const searchMovie = this.$store.getters['movies/movies'].filter((movie)=>{
        return movie.title.toLowerCase().includes(this.searchTitle.toLowerCase())
      })
        console.log(searchMovie, this.searchTitle),
        this.$emit('find-movie', searchMovie)
         }  
  }   
}
</script>
<style scoped>
input{
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  font-size: 1.2rem;
}
</style>