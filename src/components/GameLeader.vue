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
            v-if="!this.$store.getters.getRoundActive && this.$store.getters.getGameActive"
            v-on:click="newRound()"
            class="newQuestion"
          >Next Question</b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-row>&nbsp;</b-row>
    <b-progress :value="this.$store.state.timerValue" :max="this.$store.state.timerMax"></b-progress>
  </b-container>
</template>
  
<script>
import { EventBus } from "../event-bus.js";
import { setTimeout } from "timers";
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
      showFeedback: true
    };
  },
  methods: {
    getImgUrl() {
      return Master;
    },
    newRound() {
      this.$store.commit("nextQuestion");
      this.$store.commit("nextTurn");
      this.$store.commit("startTimer");
      this.$store.commit("setAnswerMin", 0); //Kontrollera
      this.$store.commit(
        "setAnswerMax",
        this.$store.getters.getCurrentQuestion.answer * 2
      ); //Kontrollera
      this.$store.commit("setRoundActive", true);
      this.mainPhrase = this.$store.getters.getCurrentQuestion.question;
      this.showFeedback = false;
    },
    checkAnswer(answer) {
      if (answer > this.$store.getters.getCurrentQuestion.answer) {
        this.setFeedback("Lower!", "danger");
        if (answer < this.$store.getters.getAnswerMax) {
          this.$store.commit("setAnswerMax", answer);
        }
        return false;
      } else if (answer < this.$store.getters.getCurrentQuestion.answer) {
        this.setFeedback("Higher!", "danger");
        if (answer > this.$store.getters.getAnswerMin) {
          this.$store.commit("setAnswerMin", answer);
        }
        return false;
      }
      return true;
    },
    checkIfPlayerWon() {
      if (this.$store.getters.getCurrentPlayer.score ==this.$store.getters.getScoreToWin) {
        this.$store.commit("setGameActive", false);
        this.$emit("show-modal");
      } else {
        this.setFeedback("Correct!", "success");
        this.$store.commit("resetTimer");
      }
    },
    evaluatePlayerAnswer(answer) {
      if (this.checkAnswer(answer)) {
        this.$store.getters.getCurrentPlayer.score++;
        this.checkIfPlayerWon();
        this.$store.commit("setRoundActive", false);
      } else {
        this.proceed();
      }
      this.showFeedback = true;
    },
    setFeedback(phrase, type) {
      this.feedbackPhrase = phrase;
      this.feedbackType = type;
    },
    proceed() {
      setTimeout(() => {
        this.$store.commit("resetTimer");
        setTimeout(() => {
          this.$store.commit("nextTurn");
          this.$store.commit("startTimer");
          this.showFeedback = false;
        }, 2000);
      }, 2000);
      this.showFeedback = true;
    }
  },
  mounted() {
    EventBus.$on("answerSent", answer => {
      setTimeout(() => {
        this.evaluatePlayerAnswer(answer);
      }, 2000);
    });
  },
  computed: {
    timeout() {
      return this.$store.getters.getTimeout;
    }
  },
  watch: {
    timeout() {
      if (this.timeout) {
        this.setFeedback("Time's up!", "danger");
        this.proceed();
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