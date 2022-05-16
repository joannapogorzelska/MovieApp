<template>
    <header>
        <h1><router-link to="/movies">{{appName}}</router-link></h1>
    </header>
</template>


<script>

export default{
    data(){
        return{
        appName: 'Movies to see'
        }
    }
}

</script>
<style scoped>
header{
    margin: 2rem auto;
    max-width: 40rem;
    display:flex;
    align-items:center;
    justify-content: space-between;
    padding: 2rem;
}
header a {
  text-decoration: none;
}

h1{
    margin-left: auto;
    margin-right: auto;
    max-width: 40rem;
    text-align: center
}

</style>