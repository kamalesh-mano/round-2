<template>
  <div>
    <form autocomplete="off">
    <div class="autocomplete" style="width:300px;">
      <h1 class="type-here">Type Here</h1>
    
    <span v-if="typing" class="beforeMessage">You are typing......</span>
    <span v-if="message" class="afterMessage" >YOU TYPED: {{message}}</span>
    <div v-if="proceed">
    <typeahead :options="options" v-model="selected" id="myInput" @input="debounceSearch" placeholder="Search" name="myCountry"></typeahead>
    </div>
    </div>
</form>
  </div>
</template>
<script>
import Typeahead from './components/Typeahead'
export default {
  components: {
    Typeahead
  },
  data: () => ({
    message: null,
    typing: null,
    debounce: null,
  
      selected: null,
      options: namestates,
      proceed:true,
    
  }),

  methods: {
    debounceSearch(event) {
      this.message = null
      this.typing = 'You are typing'
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.typing = null
        this.message = event.target.value
        this.proceed= true
      }, 500)
    }
  }
}
const namestates=[];
const GRAPHQL_URL = 'http://localhost:8000/';
async function fetchStates() {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query:`
            query{
                getStates{
                  statename{
                    name
                  }
                }
              }
              `
        })
    });
    const {data} = await response.json();
    
    return data;
}
fetchStates().then(({getStates}) => {
  getStates.forEach(state => state.statename.forEach(st => namestates.push(st.name)))
  console.log(namestates)


});
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font: 16px Arial; background-color: hsl(323 21% 16%);

}

.autocomplete {
  position: relative;
  margin-left: 750px;
  margin-top: 250px;
  display: inline-block;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}

input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #d4d4d4; 
}


.autocomplete-items div:hover {
  background-color: #e9e9e9; 
}


.autocomplete-active {
  background-color: DodgerBlue !important; 
  color: #ffffff; 
}
.afterMessage{
  color: #fe019a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 25px;
  text-shadow: 0 0 0.25em currentColor;
}
.beforeMessage{
  color: #00fdff;
  text-shadow: 0 0 0.25em currentColor;
  font-size: 25px;
}
.type-here{
  color: orangered;
  text-shadow: 0 0 0.25em currentColor;
}
</style>