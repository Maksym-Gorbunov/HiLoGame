<template>
  <b-col>
    <div class="speech-bubble" v-if="this.$store.getters.getBot1.active" v-bind:class="{active:this.$store.getters.getBot1.active}">
			<b-form-input v-model="guess" type="number" disabled></b-form-input>
		</div>
    <br>
    <!-- <playerData v-bind:player="this.$store.getters.getBot1" v-bind:guess="guess"/> -->
    <playerData v-bind:player="this.$store.getters.getPlayers[1]" v-bind:guess="guess"/>
  </b-col>
</template>

<script>
import { EventBus } from "../event-bus.js";
import playerData from "./playerData.vue";

export default {
  name: "Bot1",
  points: 0,
  components: {
    playerData
  },
  data() {
    return {
      guess: ""
    };
  },
  methods: {
    autoGuess() {
      //Någon smart algoritm för att gissa logiskt? (mha föregående fråga?)

      let min = this.$store.getters.getAnswerMin; //Get min and max values from question
      let max = this.$store.getters.getAnswerMax;

      if (min == null) {
        min = 1;
      }

      if (max == null) {
        max = 1000000;
      }

      let guess = this.randomNr(min, max);

      setTimeout(() => {
        this.guess = guess;
        EventBus.$emit("answerSent", guess);
      }, 3000);
    },
    randomNr(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  computed: {
    currentPlayer() {
        return this.$store.getters.getCurrentPlayer;
    }
  },
  watch: {
    currentPlayer() {
        if (!this.$store.getters.getBot1.active) {
            this.guess = "";//FIXA BÄTTRE LÖSNING
            return;
        }
        this.autoGuess();
    }
  }
}
</script>

<style scoped>
.speech-bubble {
	position: relative;
	background: #ffffff;
	border-radius: .4em;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 16px solid transparent;
	border-top-color: #ffffff;
	border-bottom: 0;
	border-right: 0;
	margin-left: -8px;
	margin-bottom: -16px;
}
</style>