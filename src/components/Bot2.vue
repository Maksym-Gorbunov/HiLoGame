<template>
  <b-col sm="1" md="3" lg="4" align-self="center">
    <b-form-textarea
      v-if="this.$store.getters.getBot2.active"
      v-bind:class="{active:this.$store.getters.getBot2.active}"
      id="textarea-no-resize"
      placeholder="Fixed height textarea"
      rows="3"
      no-resize
      v-model="guess"
    ></b-form-textarea>
    <templateFix v-bind:player="this.$store.getters.getBot2" v-bind:guess="guess"/>
  </b-col>
</template>

<script>
import { EventBus } from "../event-bus.js";
import templateFix from "./templateFix.vue";

export default {
  name: "Bot2",
  points: 0,
  components: {
    templateFix
  },
  props: {
    msg: String
  },
  data() {
    return {
      guess: ""
    };
  },
  methods: {
    autoGuess() {
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
        if (!this.$store.getters.getBot2.active) {
            return;
        }
        this.autoGuess();
    }
  }
};
</script>

<style>
</style>