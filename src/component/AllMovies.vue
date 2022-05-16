
<template>
<ErrorMessage v-if="error" error="Failed to fetch data" @close="confirmError">
    <template #default>
    <p>{{error}}</p>
    </template>
    <template #action>
    <TheButton @click="confirmError">Okey</TheButton>
    </template>
</ErrorMessage>
<section>
  <FindMovie   @find-movie="setFindMovies" ></FindMovie>
  <p v-html="message"></p>
</section>
<section>
  <div v-if="isLoading">
    <BaseSpinner/>
  </div>
  <ul v-else-if="hasMovies">
    <TheMovie v-for="movie in filteredMovies" :key='movie.id' :id='movie.id' :title='movie.title' :year='movie.year' :description='movie.description'/>
  </ul>
  <h3 v-else>No movies</h3>
  </section>
</template>

<script>
import FindMovie from './FindMovie.vue'
import TheMovie from './TheMovie.vue'
import ErrorMessage from './ErrorMessage.vue'
import BaseSpinner from '../UI/BaseSpinner.vue'
import TheButton from '../UI/TheButton.vue'
export default{
  props:['id', 'title', 'year', 'description'],
  components:{
    TheMovie,
    FindMovie,
    BaseSpinner,
    TheButton,
    ErrorMessage,
},
data(){
  return {
      error:null,
      isLoading:false,
      activeMovies:[],
      message:''
  }
},
methods:{
  setFindMovies(searchMovie){
    this.activeMovies=searchMovie
    console.log(searchMovie)
    if (this.activeMovies){
      if(this.activeMovies.length===0){
        this.message='<h1>No searching movies</h1>'
      }
      else{
        this.message=''
      }
    }

  },
  async loadMovies(){
    this.isLoading=true;
    this.error=null;
    try{
      await this.$store.dispatch('movies/loadMovies');
      } catch(error){
        this.error= 'Try later'
        }
    this.isLoading=false;
    
  },
  confirmError(){
            this.error=false;
        },
},
created(){
  this.loadMovies();
      },
  computed:{
    filteredMovies(){
      let movies=  this.$store.getters['movies/movies']; 
      console.log(this.activeMovies) 
        if (this.activeMovies && this.activeMovies.length>0){
          movies=this.activeMovies
          movies.sort((a, b) => a.title.localeCompare(b.title))
        }
          return movies
      },
    hasMovies(){
      return !this.isLoading && this.$store.getters['movies/hasMovies'];
    },
  }
}
</script>
<style>
ul{
  padding:0px;
}
p {
  text-align: center;
}
</style>