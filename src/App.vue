<template>
    <TheHeader/>
    <div class="app" v-if="!showMovieForm">
        <TheButton  link to='/movies/form' @click="show">Add New Movie</TheButton>
    </div>
    <div class="app" v-if="showMovieForm" >
        <TheButton  link to='/movies' @click="hide">Hide Movie Form</TheButton>
    </div>

    <router-view ></router-view>
</template>

<script>

import TheHeader from "./component/TheHeader.vue";
import TheButton from "./UI/TheButton.vue";


export default{
     computed: {
    showMovieForm() {
      return this.$store.getters.isFormSend;
    }
  },
    methods:{
       show() {
      this.$store.dispatch('showFormMovie');
    },
    hide() {
      this.$store.dispatch('hideFormMovie');
    }
    },
    components: { TheHeader, TheButton,  }
}

</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300&display=swap");
*{
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;;
}
div{
    text-align: center;
}
</style>