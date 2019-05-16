<template>
  <b-container fluid class="text-center">
    <b-row align-v="center">
      
      
    </b-row>
    <b-row>
    <b-col align-self="end">
      <b-button class="rules">Rules</b-button>
    </b-col>
    </b-row>
  </b-container>
</template>

  <script>
export default {
  name: "GameLeader",
  props: {
    msg: String
  },
  data() {
      return {
        text: ''
      }
    },
    created() {
      this.$store.commit("setGameActive", true);
      this.newRound();
    }
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.imgDiv{
  padding: 3rem;
}

.jumbotron{
  background: #ee0979;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff6a00, #ee0979);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ff6a00, #ee0979); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-size: cover;
  height: 100vh;
  width: 100vh;
  
}

.submit{
  background: #000000;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.submit:hover{
  cursor: pointer;
    box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
    transform: translateY(-0.1rem);
    transition: transform 150ms;
}

.rules{
   background: #000000;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.rules:hover{
  cursor: pointer;
    box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
    transform: translateY(-0.1rem);
    transition: transform 150ms;
}

.formss{
  margin: 2rem;
  margin-left: 20rem;
  
}

.img{
  width: 200px;
  display: flex;
  

}

.rules{
  
  float:right;
}

.imageRow{
  margin-left: 17rem;
  display: flex;
}




</style>