<template>
    <BaseCard>
        <li>
            <h2>{{movieTitle}}<span>({{movieYear}})</span></h2>
            <TheButton link :to="showDescription">Show Description</TheButton>
            <TheButton @click="remove(id)">Remove Movie</TheButton>
        </li>
    </BaseCard>
</template>
<script>
import BaseCard from "../UI/BaseCard.vue"
import TheButton from "../UI/TheButton.vue"
export default{
    props: ['id', 'title', 'year',],
    computed: {
        movieTitle() {
            return this.title;
        },
        movieYear() {
            return this.year;
        },
        showDescription() {
            return this.$route.path + '/' + this.id;
        },
    },
    components: { 
        BaseCard, 
        TheButton 
        },
    methods:{
        remove(id) {
            
            this.$store.dispatch('movies/removeMovie', id);
    },
    }
}
</script>
<style>
li{
    list-style: none;
}
</style>
