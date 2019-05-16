<template>
  <div id="app">
    <h1>START ....</h1>
  </div>
</template>

<script>

export default {
  name: 'start'
}

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
  if(xhr.readyState == 4 && xhr.status == 200){
    this.$store.state.questions = xhr.response;
  }
}

xhr.open("GET", "http://localhost:3000/data/" + rounds);
xhr.responseType = "json";
xhr.send();

</script>
  
<style>

</style>
