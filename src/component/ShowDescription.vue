<template>
    <BaseCard>
        <li>
            <h1 v-if="edit">You are changing!</h1>
            <label v-if="edit" for="title">Change Title</label>
            <input id="title" class ='form-control' v-if="edit" v-model.trim="editForm.title"/>
            <h1 v-else>{{movieTitle}}</h1>
            <label v-if="edit" for="year">Change Year</label>
            <input id='year' class ='form-control' type="number" min="1900" v-if="edit" v-model.number="editForm.year"/>
            <span v-else>({{movieYear}})</span>
            <label v-if="edit" for="description">Change Description</label>
            <textarea id='description' class ='form-control' v-if="edit" v-model.trim="editForm.description"/>
            <p v-else>{{movieDescription}}</p>
        </li>
        <TheButton link :to="hideDescription">Hide Description</TheButton>
        <TheButton v-if="!edit" @click="editMovie"> Edit Movie </TheButton>
        <TheButton v-if="edit"  @click="editMovieCancel"> Cancel Edit </TheButton>
        <TheButton v-if="edit"  @click="editMovieSave(id)"> Save changes </TheButton>
    </BaseCard>
</template>
<script>
import BaseCard from "../UI/BaseCard.vue"
import TheButton from "../UI/TheButton.vue"
export default{
    props: ['id', 'title', 'year', 'description'],
    components: { BaseCard, TheButton, },
    data() {
        return {
            edit: false,
            editForm:{
                title:'',
                year:'',
                description:'',
            },
            selectedMovie:null,
    };
  },
  created(){  
         this.loadUpdateMovies()      
         this.selectedMovie = this.$store.getters['movies/movies'].find((movie) => movie.id === this.id);            
      },
    computed: {        
        movieTitle(){
            return this.selectedMovie.title;         
        },
        movieYear() {
            return this.selectedMovie.year;
        },
        movieDescription() {
            return this.selectedMovie.description
            
        },
        hideDescription() {
            return "/movies"
        },        
    },  
    methods:{
        async loadUpdateMovies(){
        this.isLoading=true;
        try{
            await this.$store.dispatch('movies/loadUpdateMovies');
        } catch(error){
        this.error= 'Try later'
        }
        this.isLoading=false;
    
  },
        editMovie(){
            this.edit=!this.edit,
            this.editForm.title=this.movieTitle,
            this.editForm.year=this.movieYear,
            this.editForm.description=this.movieDescription
        },
        editMovieCancel(){
            this.edit=!this.edit,
            this.editForm.title='',
            this.editForm.year='',
            this.editForm.description=''
        },
        editMovieSave(id){
            const editData={
            title:this.editForm.title,
            year:this.editForm.year,
            description:this.editForm.description,
            id:this.id
            }
            this.$store.dispatch('movies/loadUpdateMovies', {id, editData});
            this.$router.push('/movies')
        },
    }      
}
</script>

<style scoped>
li{
    list-style: none;
}
label {
  font-weight: bold;
}
.form-control {
  margin: 0.5rem 0;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  font-size: 1.2rem;
}
input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
</style>