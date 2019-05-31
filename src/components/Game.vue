<template>
  <div>
    <div>
        <Results ref="resultsModal"/>
    </div>
    <div>
      <b-row>
      <b-col align-self="end">
        <b-button v-b-modal.modal-center>Rules</b-button>
          <b-modal id="modal-center" centered title="Rules">
            <p class="my-4">This is a high-low game. Answer the question by entering a number in the input field and clicking submit.
              The game leader will then tell you higher, lower or correct depending on the answer.
            </p>
          </b-modal>
        <b-button class="restart" @click="restart()">Restart</b-button>
      </b-col>
    </b-row>
    <GameLeader v-on:show-modal= "showModal" v-on:restart-game= "restart"/>
    <b-container fluid>
      <b-row class="some-row align-items-end">
        <b-col md>
          <User/>
        </b-col>
        <b-col md>
          <Bot :bot= "this.$store.getters.getPlayers[1]"/>
        </b-col>
        <b-col md>
          <Bot :bot = "this.$store.getters.getPlayers[2]"/>
        </b-col>
      </b-row>
    </b-container>
    </div>
  </div>
</template>

<script>
import Results from './Results'
import GameLeader from './GameLeader.vue'
import User from './User.vue'
import Bot from './Bot.vue'
// import Bot1 from './Bot1.vue'
// import Bot2 from './Bot2.vue'


export default {
  name: 'game',
  components: {
    Results,
    GameLeader,
    User,
    Bot
    // Bot1,
    // Bot2
  },
  methods: {
    restart() {
      this.$router.replace("/");
    },
    showModal(){
      this.$refs.resultsModal.showModal();
    }
  },
  created() {
    if (!this.$store.getters.getGameActive) {
      this.$router.replace("/");
    }
  },
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #5f2c82;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #49a09d, #5f2c82);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #49a09d, #5f2c82); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.some-row {
  min-height: 5rem;
}
</style>