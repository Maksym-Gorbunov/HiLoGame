<template>

<b-col sm="1" md="3" lg="4" align-self="center">
    <b-input-group v-if="activePlayer"
		 v-bind:class="{active: activePlayer}">
        <b-form-input v-model="userInput" type="number" v-bind:disabled="answerSent"></b-form-input>
            <b-input-group-append>
                <b-button variant="info" v-on:click="sendAnswer()" v-bind:disabled="!validUserInput || answerSent">Submit</b-button>
            </b-input-group-append>
    </b-input-group>
		 <playerData v-bind:player="this.$store.getters.getUser"/>
  </b-col>
 
</template>

<script>
  import { EventBus } from "../event-bus.js";
  import playerData from "./playerData.vue";

  export default {
		data() {
			return {
				userInput: undefined,
				answerSent: false
			}
		},
		components: {
			playerData
		},
		computed: {
			validUserInput() {
				return !isNaN(this.userInput) && this.userInput.length !== 0;
			},
			activePlayer() {
				return this.$store.getters.getUser.active;
			}
		},
		methods: {
			sendAnswer() {
				this.answerSent = true;
				EventBus.$emit("answerSent", this.userInput);
			}
		},
		watch: {
			activePlayer() {
				if (!this.activePlayer) {
					this.userInput = undefined;
					this.answerSent = false;
				}
			}
		}
  }  
</script>

<style scoped>
.img_responsive {
  margin-top: 10rem;
}
</style>