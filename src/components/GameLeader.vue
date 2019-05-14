<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template slot="lead">
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
        <b-img src="http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png" fluid alt="Responsive image"></b-img>
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

.formss{
  margin: 2rem;
  margin-left: 12rem;
  
}

.img{
  width: 200px;
}

.rules{
  
  float:right;
}

.imageRow{
  margin-left: 10rem;
}
</style>