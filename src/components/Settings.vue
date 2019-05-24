<template>
  <div>
    <header>
      <h2>SETTINGS</h2>
      <button @click="back()" type="button" class="btn btn-primary btn-sm my_btn"><-- Back</button>
      <button @click="loadFile()" type="button" class="btn btn-success btn-sm my_btn">Load File</button>
      <button @click="clear()" type="button" class="btn btn-danger btn-sm my_btn">Clear</button>
      <form id="addForm">
        <input type="text" placeholder="question" ref="question">

        <select class="mdb-select md-form colorful-select dropdown-primary" ref="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input type="number" placeholder="answer" ref="answer">

        <button @click="add()" type="button" class="btn btn-success btn-sm my_btn">add</button>
      </form>
      <h5>total: {{this.$store.getters.getData.length}}</h5>
    </header>

    <div class="table-responsive" id="my_table_box">
      <table id="my_table" class="table table-dark table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">question</th>
            <th scope="col">difficulty</th>
            <th scope="col">answer</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody v-for="item in this.$store.getters.getData" v-bind:key="item.index">
          <TableItem v-bind:item="item"/>
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
      console.log("add");
      console.log(parseInt(this.$refs.answer.value))
      console.log(this.$refs.answer.value)
      let newQuestion = {
        question: this.$refs.question.value,
        answer: parseInt(this.$refs.answer.value),
        difficulty: this.$refs.difficulty.value
      }
      this.addNewQuestionToAPI(newQuestion)
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
      console.log("loadFile");
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
            console.log("clear");
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
    }
  },
  created() {
    // Material Select Initialization
    // $(document).ready(function() {
    //   $(".mdb-select").materialSelect();
    // });
  }
};
</script>


<style>
.my_btn {
  color: black;
  margin: 0.3rem !important;
}
.disabledHeader {
  pointer-events: none;
  opacity: 0.3;
}
</style>
