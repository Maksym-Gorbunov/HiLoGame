<template>
  <div id="main">
    <header>
      <h2>Settings</h2>
      <button @click="back()" type="button" class="btn btn-primary btn-sm my_btn">
        <i class="fas fa-long-arrow-alt-left"></i>  Back 
      </button>
      <button @click="loadFile()" type="button" class="btn btn-success btn-sm my_btn">
        <i class="fas fa-download"></i>  Load File
      </button>
      <button @click="clear()" type="button" class="btn btn-danger btn-sm my_btn">
        <i class="far fa-trash-alt"></i>  Clear
      </button>
      <div id="total"> Total: {{this.$store.getters.getData.length}} </div>
      <form id="addForm">
        <input type="text" placeholder=" Question" ref="question" id="inputQuestion">
        <input type="number" placeholder=" Answer" ref="answer" id="inputAnswer">
        <select class="mdb-select md-form colorful-select dropdown-primary" ref="difficulty" id="selectDifficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button @click="add()" type="button" class="btn btn-success btn-sm my_btn" id="addButton">
          <i class="fas fa-plus-circle"></i> add
        </button>
      </form>
    </header>

    <div class="table-responsive" id="my_table_box">
      <table id="my_table" class="table table-dark table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">question</th>
            <th scope="col">difficulty</th>
            <th scope="col">answer</th>
            <th scope="col" class="td_actions">actions</th>
          </tr>
        </thead>
        <tbody v-for="(item,index) in this.$store.getters.getData" v-bind:key="item.index">
          <TableItem v-bind:item="item" v-bind:tableIndex="{ index }" />
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import TableItem from "./TableItem.vue";
import { async } from 'q';

export default {
  name: "Settings",
  props: [],
  components: { TableItem },
  methods: {
    back() {
      this.$router.push({ name: "start" });
    },
    add() {
      let newQuestion = {
        question: this.$refs.question.value,
        answer: parseInt(this.$refs.answer.value),
        difficulty: this.$refs.difficulty.value
      }
      this.addNewQuestionToAPI(newQuestion)
      $("#addButton").attr("disabled", true);
      $("#inputQuestion").val('')
      $("#inputAnswer").val('')
    },
    addNewQuestionToAPI(item){
      var url = "http://localhost:3000/data/add";
      var json = JSON.stringify(item);
      var xhr = new XMLHttpRequest();
      let that = this
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == "200") {
          that.getAllDataFromApi()
        }
      };
      xhr.send(json);
    },
    loadFile() {
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var apiUrl = `http://localhost:3000/data/loadFile`;
      var xhr = new XMLHttpRequest();
      let that = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            that.$store.commit("setData", data);
          }
          if (xhr.status == 500) {
            console.log("serverfel");
          }
        }
      };
      xhr.open("GET", apiUrl);
      xhr.responseType = "json";
      xhr.send();
    },
    getAllDataFromApi() {
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var apiUrl = `http://localhost:3000/data`;
      var xhr = new XMLHttpRequest();
      let that = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            that.$store.commit("setData", data);
          }
          if (xhr.status == 500) {
            console.log("serverfel");
          }
        }
      };
      xhr.open("GET", apiUrl);
      xhr.responseType = "json";
      xhr.send();
    },
    clear() {
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var apiUrl = `http://localhost:3000/delete/all`;
      var xhr = new XMLHttpRequest();
      let that = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            that.$store.commit("setData", {});
          }
          if (xhr.status == 500) {
            console.log("serverfel");
          }
        }
      };
      xhr.open("GET", apiUrl);
      xhr.responseType = "json";
      xhr.send();
    },
    addBtnListener(){
    
      //Set button disabled
      $("#addButton").attr("disabled", true);
 
      //Append a change event listener to you inputs
      $('input').change(function(){
            //Validate your form here, example:
            var validated = true;
            if(($('#inputQuestion').val().length === 0) || ($('#inputAnswer').val().length === 0)){
              validated = false;
              
              } 
              
 
            //If form is validated enable form
            if(validated) $("#addButton").attr("disabled", false);                             
      });
 
      //Trigger change function once to check if the form is validated on page load
      $('input:first').trigger('change');

  }
  },
  
  created() {
   
  },
  mounted(){
    this.addBtnListener()
  }
};
</script>


<style>
body{
  background-image: linear-gradient(to right, #bbb , #fff);
}
.my_btn {
  color: black;
  margin: 0.3rem !important;
  min-width: 5rem;
}
.disabledHeader {
  pointer-events: none;
  opacity: 0.3;
}
#addForm{
  display:grid;
  /* grid-template-columns: 5fr 1fr 1fr 0.6fr; */
  grid-template-columns: 5fr 0.8fr 0.8fr 0.6fr;
  grid-gap: 1rem;
  padding: 1rem;
  background-color: #8c98a3;
  margin: 1rem 0 !important;
}
#inputQuestion{
  line-height: inherit;
  margin: 0;
  padding: 0;
}
#selectDifficulty, #inputAnswer{
  width: 7rem;
  margin: 0;
  padding: 0;
}
#total{
  letter-spacing: 0.1rem;
  position: absolute;
  top: 1rem;
  right: 4rem;
  font-size: 1.1rem;
  color:white;
  background-color: #3E444A;
  width: 8rem;
  height: 2rem;
  line-height: 2rem;
  margin: 0.5rem auto !important;
  border: 1px solid #fff;
}
#main{
  position: relative;
  padding: 1rem 4rem;
}
#main h2{
  letter-spacing: 0.2rem;
  margin-bottom: 0.7rem !important;
}
#addButton{
  border: 1px solid #ccc;
  margin: 0 !important;
  padding: 0 !important;
}
</style>
