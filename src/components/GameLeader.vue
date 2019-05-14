<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template slot="lead">
        <b-img src="~/static/simon.jpg"></b-img>
        <p>Fråga</p>
      </template>
      <hr class="my-4">
      <b-list-group>
        <b-row class="formss">
          <b-col sm="3">
          <b-form-input v-model="text" placeholder="Enter your answer"></b-form-input>
          </b-col>
          <b-col sm="3">
          <b-form-input v-model="text" placeholder="Enter bot answer"></b-form-input>
          </b-col>
          <b-col sm="3">
          <b-form-input v-model="text" placeholder="Enter bot answer"></b-form-input>
          </b-col>
        </b-row>
      </b-list-group>
        <b-row class="imageRow">
          <div class="imgDiv">
        <b-img src="http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png" fluid alt="Responsive image"></b-img>
        </div>
        <div class="imgDiv">
        <b-img src="http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png" fluid alt="Responsive image"></b-img>
        </div>
        <div class="imgDiv">
        <b-img src="http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png" fluid alt="Responsive image"></b-img>
        </div>
        </b-row>
      <b-button class="submit">Submit</b-button>
      <b-col class="rulesMenu">
      <b-button class="rules">Rules</b-button>
      </b-col>
    </b-jumbotron>
  </div>
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