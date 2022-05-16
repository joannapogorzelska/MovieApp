<template>
    <button v-if="!link">
      <slot></slot>
    </button>
    <router-link v-else :to="to">
      <slot></slot>
    </router-link>
</template>

<script>
export default {
  props:{
    link:{
      type:Boolean,
      required:false,
      default:false,
    },
    to:{
      type:String,
      required:false,
      default:'/',
    }
  }
}
</script>

<style scoped>
button,a {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  border-radius: 30px;
  margin: 2rem 0.5rem;
}
a{
  text-decoration: none;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}


</style>