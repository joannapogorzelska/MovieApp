<template>
  <BaseCard>
    <ErrorMessage v-if="inputsAreInvalid" error="Invalid inputs" @close="confirmError">
    <template #default>
    <p>Please, check all inputs</p>
    </template>
    <template #action>
    <TheButton @click="confirmError">Okey</TheButton>
    </template>
</ErrorMessage>
    <ErrorMessage v-if="error" error="Could not save data!" @close="confirmError">
    <template #default>
    <p>{{error}}</p>
    </template>
    <template #action>
    <TheButton @click="confirmError">Okey</TheButton>
    </template>
</ErrorMessage>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: titleValidity === 'invalid'}">
      <label for="title">Title</label>
      <input id="title" name="title" type="text" v-model.trim="enteredTitle" @blur="validateInputTitle" placeholder="Add movie title"/>
      <p v-if="titleValidity === 'invalid'">Please enter a Title!</p>
    </div>
    <div class="form-control" >
      <label >Choose year of production</label>
      <select v-model="key">
        <option v-for="year in years" :v-model="enteredYear" :value="year" :key="year">{{ year }}</option>
      </select>
    </div>
    <div class="form-control" :class="{invalid: descriptionValidity === 'invalid'}">
      <label for="description">Movie description</label>
      <textarea id="description" name="description" type="text" v-model="enteredDescription" placeholder="Add movie description" cols="50" rows="3" @blur="validateInputDescription"/>
    <p v-if="descriptionValidity === 'invalid'">Please enter more than {{min}} characters and less than {{max}} characteres</p>
    </div>
    <div>
      <TheButton @click="add">Add Movie</TheButton>
    </div>
  </form>
  </BaseCard>
</template>

<script>
//import axios from 'axios';
import BaseCard from "../UI/BaseCard.vue";
import TheButton from "../UI/TheButton.vue";
import ErrorMessage from "./ErrorMessage.vue";
export default {
  
  components:{
    BaseCard,
    TheButton,
    ErrorMessage
},
  data() {
    return {
      enteredTitle: '',
      enteredDescription: '',
      enteredYear:'',
      key:'',
      titleValidity: false,   
      max:200,
      min:10,
      descriptionValidity:false,
      inputsAreInvalid:false,
      error:null, 
    };
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
      const oldestMovie=1900;
      return Array.from({length: year - oldestMovie + 1}, (value, index) => year - index)
    }
  },
   methods: {
      add() {
        if (this.enteredTitle==="" || this.enteredDescription==='' ){
        this.inputsAreInvalid = true;
        return
      }
      this.inputsAreInvalid = false;
      this.error = null;
      const formData={ 
          title: this.enteredTitle,
          description: this.enteredDescription,
          year:this.key,
          id:this.id,
          key:this.key,
      }
      console.log(formData)
      this.$store.dispatch('movies/newMovie', formData);
       this.$store.dispatch('hideFormMovie');
      this.$router.push('/movies')
      this.enteredTitle='',
      this.enteredDescription='',
      this.key=''
    },
    confirmError(){
      this.inputsAreInvalid=false;
      this.error=false;
    },
    validateInputTitle() {
      if (this.enteredTitle === '') {
        this.titleValidity = 'invalid';
      } else {
        this.titleValidity = 'valid';
      }
    },
    validateInputDescription() {
      if (this.enteredDescription === '') {
        this.descriptionValidity = 'invalid';
      } else if (this.enteredDescription.length<this.min) {
        this.descriptionValidity = 'invalid'
      } else if (this.enteredDescription.length>this.max) {
        this.descriptionValidity = 'invalid'
      }else{
        this.descriptionValidity = 'valid';
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}
.form-control.invalid input {
  border-color: red;
}
.form-control.invalid label {
  color: red;
}
label {
  font-weight: bold;
}
h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}
p {
  text-align: center;
}
input,
select, textarea {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
select {
  width: 100%;
}
button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}
button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>