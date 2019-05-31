<template>
  <div id="app">
    <b-row>
      <b-col md="3">
      </b-col>
      <b-col md="6">
        <b-jumbotron class="mt-5 bg-light" header="High Low Game" >
				<form>
          <div class="form-group row py-1">
            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
            <input type="text" ref="name" class="form-control" id="inputName" placeholder="Name">
            </div>
          </div>
          <div class="form-group row py-1">
            <label for="score" class="col-sm-2 col-form-label">Questions</label>
            <div class="col-sm-10">               
          <select id="score" ref="score" name="Score To Win" class="form-control">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
            </div>
          </div>
          <div class="form-group row py-1">
          <label for="difficulty" class="col-sm-2 col-form-label">Difficulty</label>
          <div class="col-sm-10">     
					<select id="difficulty" ref="difficulty" name="difficulty" class="form-control">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          </div>
          </div>
          <div class="form-group row py-1">
          <label for="bot1" class="col-sm-2 col-form-label">Bot 1</label>
          <div class="col-sm-10">     
          <select ref="bot1_name" id="bot1" name="bot1" class="form-control" v-model="bot_1">
            <option v-for="item in this.bots" v-bind:key="item.index"
              v-bind:disabled="isDisabled1(item)" :value="item">{{item}}
            </option>
          </select>
          </div>
          </div>
          <div class="form-group row py-1">
          <label for="bot2" class="col-sm-2 col-form-label">Bot 2</label>
          <div class="col-sm-10">     
          <select ref="bot2_name" id="bot2" name="bot2" class="form-control" v-model="bot_2">
            <option v-for="item in this.bots" v-bind:key="item.index"
              v-bind:disabled="isDisabled2(item)" :value="item"> 
              {{item}}
            </option>
          </select>
          </div>
          </div>
          <button @click.prevent="start()" id="btnStart" type="button" class="btn btn-primary"
            v-bind:disabled="startBtnListener()">
            START
          </button>
				</form>
        </b-jumbotron>
      </b-col>
    <b-col md="3"></b-col>
    </b-row>
  <b-row>
    <b-col md="3"></b-col>
    <b-col>
    </b-col>
    <b-col md="3"></b-col>
  </b-row>
  <br/>
    <button @click="settings()">Settings</button>
		<div class="colorlibcopy-agile align-text-bottom">
			<p>© 2019 IT-Högskolan &nbsp;|&nbsp; Source code on <a href="https://github.com/Maksym-Gorbunov/HiLoGame" target="_blank">GitHub</a></p>
		</div>
  </div>
</template>


<script>
export default {
  name: 'start',
  props: [],
  components: {},
  data(){
    return {
      bot_1: 'Bot',
      bot_2: 'Einstein',
      bots: ['Bot', 'Einstein', 'Monkey', 'The thinker', 'Dwarf']
    }
  },
  methods: {
    hideUrlBarMobile(){
      addEventListener("load", function() { 
        setTimeout(window.scrollTo(0,1), 0) 
        }, false
      ) 
    },
    settings(){
      this.$router.push({ name: 'settings' })
    },
    startBtnListener(){
      if(this.bot_1 == '' || this.bot_2 == ''){
        return true
      }
    },
    isDisabled1(value){
      if((this.bot_1 != '') && (this.bot_2 != '')){
        if(this.bot_2 == value){
          return true
        }
      }
    },
    isDisabled2(value){
      if((this.bot_1 != '') && (this.bot_2 != '')){
        if(this.bot_1 == value){
          return true
        }
      }
    },
    start() {
      if(this.$refs.name.value){
      let name = this.$refs.name.value
      name = name.charAt(0).toUpperCase() + name.slice(1);
      let score = this.$refs.score.value
      let difficulty = this.$refs.difficulty.value
      let bot1_name = this.$refs.bot1_name.value
      let bot2_name = this.$refs.bot2_name.value
      let players = {
        userName: name,
        bot1Name: bot1_name,
        bot2Name: bot2_name 
      }
      let total = (score * 3) - 2
      this.getDataFromApi(total, difficulty)
      this.$router.push({ name: 'game' })
      this.sendName(name)
      this.$store.commit("setGameActive", true);
      this.$store.commit("initPlayers", players);
      this.$store.commit("setScoreToWin", score);
      }
      else {this.$refs.name.placeholder="You have to pick a name!"}
    },
    getDataFromApi(total, difficulty){
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
      var apiUrl = `http://localhost:3000/data/${total}/${difficulty}`
      var xhr = new XMLHttpRequest()
      let that = this
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText)
            that.sendData(data)
          }
          if (xhr.status == 500) {
            console.log("serverfel");
          }
        }
      }
      xhr.open("GET", apiUrl);
      xhr.responseType = "json";
      xhr.send();
    },
    sendData(data){
      this.$store.commit("setQuestions", data);
    },
    sendName(name){
      this.$store.commit("setUserName", name)
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
            that.$store.commit('setData', data)
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
    this.hideUrlBarMobile()
    this.getAllDataFromApi()
  },
  mounted() {
  }
}
</script>

  
<style scoped>

</style>