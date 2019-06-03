<template>
  <b-container fluid class="text-center">
    <b-row class="justify-content-md-center">
      <b-col cols="6" lg="2">
        <b-img v-bind:src="getImgUrl()"></b-img>
      </b-col>
      <b-col cols="6" lg="2">
        <b-row>
          <div class="speech-bubble" v-html="mainPhrase" width="100"></div>
        </b-row>
        <br>
        <b-row>
          <b-alert v-bind:variant="feedbackType" v-bind:show="showFeedback">{{ feedbackPhrase }}</b-alert>
          <b-button
            v-if="!this.roundActive && this.gameActive"
            v-on:click="startNewRound()"
            class="newQuestion"
          >{{ buttonText}}</b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row>&nbsp;</b-row>
  </b-container>
</template>
  
<script>
import { EventBus } from "../event-bus.js";
import { setTimeout } from "timers";
import Master from "@/assets/Master.png";
import { constants } from 'crypto';

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
      buttonText: "Yes!"
    };
  },
  methods: {
    getImgUrl() {
      return Master;
    },

    //Set up states and start new game round
    startNewRound() {
      this.$store.commit("nextQuestion");
      this.mainPhrase = this.currentQuestion.question;
      this.showFeedback = false;

      this.$store.commit("nextTurn");
      this.$store.commit("startTimer");
      this.initMinMax();
      this.$store.commit("setRoundActive", true);
    },
    initMinMax() {
      let offsetPercentage = 50;
      let offset = Math.floor(this.currentQuestion.answer * offsetPercentage / 100);

      let initMin = this.currentQuestion.answer - offset;
      let initMax = this.currentQuestion.answer + offset;
      if (initMin < 0 && this.currentQuestion.answer > 0) {
        initMin = 0;
      }

      this.$store.commit("setAnswerMin", initMin);
      this.$store.commit("setAnswerMax", initMax); 
    },
    evaluatePlayerAnswer(answer) {
      let answerCheck = this.checkAnswer(answer);
      this.setAnswerCheckStates(answer, answerCheck);

      if (this.checkIfPlayerWon()) {
        this.setGameFinishedState();
      } else {
        if (answerCheck !== 0) {
          this.proceedToNextPlayer();
        }
        this.showFeedback = true;
        this.buttonText = "Next Question";
      }
    },

    //Check wether player answer is too high/too low/correct
    checkAnswer(answer) {
      if (answer > this.currentQuestion.answer) {
        return 1;
      } else if (answer < this.currentQuestion.answer) {
        return -1;
      }
      return 0;
    },

    //Set particular states depending on answer check return 
    setAnswerCheckStates(answer, answerCheck) {
      switch(answerCheck) {
        case -1: 
          this.setFeedback("Higher!", "danger");
          if (answer > this.answerMin) {
            this.$store.commit("setAnswerMin", answer);
          }
          break;
        case 0:
          this.setFeedback("Correct!", "success");
          this.currentPlayer.score++;
          this.$store.commit("setRoundActive", false);
          this.$store.commit("resetTimer");
          break;
        case 1: 
          this.setFeedback("Lower!", "danger");
          if (answer < this.answerMax) {
            this.$store.commit("setAnswerMax", answer);
          }
          break;
      }
    },
    checkIfPlayerWon() {
      return this.currentPlayer.score == this.scoreToWin; //ScoreToWin är text atm
    },
    setGameFinishedState() {
      this.$store.commit("setGameActive", false);
      this.$emit("show-modal");
      EventBus.$emit("winnerNameSent", this.currentPlayer.name);
    },
    proceedToNextPlayer() {
      setTimeout(() => {
        this.$store.commit("resetTimer");
        setTimeout(() => {
          this.$store.commit("nextTurn");
          this.$store.commit("startTimer");
          this.$store.commit("setTimeout", false);
          this.showFeedback = false;
        }, 2000);
      }, 2000);
    },
    setFeedback(phrase, type) {
      this.feedbackPhrase = phrase;
      this.feedbackType = type;
    }
  },
  mounted() {
    //Listen for player answer and evaluate it when it has arrived
    EventBus.$on("answerSent", answer => {
      setTimeout(() => {
        this.evaluatePlayerAnswer(answer);
      }, 2000);
    });
  },
  computed: {
    //Store getters
    gameActive() {
      return this.$store.getters.getGameActive;
    },
    roundActive() {
      return this.$store.getters.getRoundActive;
    },
    scoreToWin() {
      return this.$store.getters.getScoreToWin;
    },
    answerMin() {
      return this.$store.getters.getAnswerMin;
    },
    answerMax() {
      return this.$store.getters.getAnswerMax;
    },
    currentPlayer() {
      return this.$store.getters.getCurrentPlayer;
    },
    currentQuestion() {
      return this.$store.getters.getCurrentQuestion;
    },
    timeout() {
      return this.$store.getters.getTimeout;
    },
  },
  watch: {
    //Procedure if answer time has expired 
    timeout() {
      if (this.timeout) {
        this.setFeedback("Too slow!", "danger");
        this.showFeedback = true;
        this.proceedToNextPlayer();
      }
    }
  },
  beforeDestroy() {
    EventBus.$off("answerSent");
  }
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 300px;
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
  border-radius: 0.4em;
  width: 260px;
  padding: 40px 10px;
  margin: 1em 0;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
}

.speech-bubble:after {
  content: "";
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