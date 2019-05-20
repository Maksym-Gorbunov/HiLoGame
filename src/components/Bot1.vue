<template>
  <b-col sm="1" md="3" lg="4" align-self="center">
    <b-form-textarea
      v-if="this.$store.getters.getBot1.active"
      v-bind:class="{active:this.$store.getters.getBot1.active}"
      id="textarea-no-resize"
      placeholder="Fixed height textarea"
      rows="3"
      no-resize
      v-model="guess"
    ></b-form-textarea>
    <playerData v-bind:player="this.$store.getters.getBot1" v-bind:guess="guess"/>
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
            return;
        }
        this.autoGuess();
    }
  }
}
</script>

<style>
</style>