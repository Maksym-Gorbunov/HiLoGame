<template>
  <b-container fluid class="text-center">
    <b-row>
      <b-col align-self="end">
        <b-button class="rules">Rules</b-button>
        <b-button class="rules">Restart</b-button>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col cols="6" lg="2">
        <b-img v-bind:src="getImgUrl()"></b-img>
      </b-col>
      <b-col cols="6" lg="2">
        <b-row>
          <!--
            <b-card style="max-width: 20rem;">
            <b-card-text v-html="mainPhrase" width="100"></b-card-text>
          </b-card>
          -->
          <div class="speech-bubble" v-html="mainPhrase" width="100">
          </div>
        </b-row>
        <br>
        <b-row>
          <b-alert v-bind:variant="feedbackType" v-bind:show="showFeedback">{{ feedbackPhrase }}</b-alert>
          <b-button v-if="!this.$store.getters.getRoundActive" v-on:click="buttonClicked()" class="newQuestion">{{ buttonText }}</b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row>&nbsp;</b-row>
  </b-container>
</template>
  
<script>
import { EventBus } from "../event-bus.js";
import { setTimeout } from 'timers';
import Master from "@/assets/Master.png";

export default {
  name: "GameLeader",
  props: {
    msg: String
  },
  data() {
    return {
      mainPhrase: "Welcome to the HiLo game!",
      feedbackPhrase: "Are you ready?",
      feedbackType: "info",
      showFeedback: true,
      buttonText: "Ok!"
    }
  },
  methods: {
    getImgUrl(){
      return Master
    },
    buttonClicked() {
      if (this.$store.getters.getGameActive) {
        this.newRound();
      } else {
        //TODO
        // this.$store.commit("resetState");
        // this.$router.replace("/"); //Route to start page
      }
    },
    newRound() {
      this.$store.commit("nextQuestion");
      this.$store.commit("nextTurn");
      this.mainPhrase = this.$store.getters.getCurrentQuestion.question;
      this.showFeedback = false;
      this.$store.commit("setAnswerMin", 0);//Kontrollera
      this.$store.commit("setAnswerMax", this.$store.getters.getCurrentQuestion.answer * 2);//Kontrollera
      this.$store.commit("setRoundActive", true);
    },
    checkAnswer(answer) {
      if (answer > this.$store.getters.getCurrentQuestion.answer) {
        this.feedbackPhrase = "Lower!";
        this.feedbackType = "danger";
        if (answer < this.$store.getters.getAnswerMax) {
          this.$store.commit("setAnswerMax", answer);
        }
        return false;
      } else if (answer < this.$store.getters.getCurrentQuestion.answer) {
        this.feedbackPhrase = "Higher!";
        this.feedbackType = "danger";
        if (answer > this.$store.getters.getAnswerMin) {
          this.$store.commit("setAnswerMin", answer);
        }
        return false;
      }
      return true;
    },
    checkIfPlayerWon() {
      if (this.$store.getters.getCurrentPlayer.score == this.$store.getters.getScoreToWin) { //Ändra till === när vi fixar number secure
        this.$store.commit("setGameActive", false);
        this.mainPhrase = "Congratulations " + this.$store.getters.getCurrentPlayer.name + "! You won!";
        this.feedbackPhrase = "Play again?";
        this.buttonText = "Ok!"
      } else {
        this.feedbackPhrase = "Correct!";
        this.feedbackType = "success";
        this.buttonText = "Next question"
      }
    },
    evaluatePlayerAnswer(answer) {
      if (this.checkAnswer(answer)) {
        this.$store.getters.getCurrentPlayer.score++; 
        this.checkIfPlayerWon();
        this.showFeedback = true;
        this.$store.commit("setRoundActive", false);
      } else {
        this.showFeedback = true;
        setTimeout(() => {
          this.$store.commit("nextTurn");
          this.showFeedback = false;
        }, 2000);
      }
    }
  },
  mounted() {
    EventBus.$on("answerSent", answer => {
      setTimeout(() => {
        this.evaluatePlayerAnswer(answer);
      }, 2000);
    });
  },
  beforeDestroy() {
    EventBus.$off('answerSent')
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

.imgDiv {
  padding: 3rem;
}

img {
  height: 300px;
}

.jumbotron {
  background: #ee0979; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff6a00,
    #ee0979
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff6a00,
    #ee0979
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-size: cover;
  height: 100vh;
  width: 100vh;
}

.submit {
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.submit:hover {
  cursor: pointer;
  box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
  transform: translateY(-0.1rem);
  transition: transform 150ms;
}

.rules {
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.rules:hover {
  cursor: pointer;
  box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
  transform: translateY(-0.1rem);
  transition: transform 150ms;
}

.formss {
  margin: 2rem;
  margin-left: 20rem;
}

.img {
  width: 200px;
  display: flex;
}

.rules {
  float: right;
}

.imageRow {
  margin-left: 17rem;
  display: flex;
}

.boxed {
  border: 1px solid green;
}

.speech-bubble {
	position: relative;
	background: #ffffff;
	border-radius: .4em;
  width: 260px;
    padding: 40px 10px;
    margin: 1em 0;
    text-align: center;
    font-weight: bold;
    font-size: 100%;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 7px solid transparent;
	border-right-color: #ffffff;
	border-left: 0;
	margin-top: -7px;
	margin-left: -7px;
}
</style>