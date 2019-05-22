<template>

<b-col sm="1" md="3" lg="4" align-self="center">
    <b-input-group v-if="this.$store.getters.getUser.active"
		 v-bind:class="{active:this.$store.getters.getUser.active}">
        <b-form-input v-model="userInput" type="number"></b-form-input>
            <b-input-group-append>
                <b-button variant="info" v-on:click="sendAnswer()" v-bind:disabled="!validUserInput">Submit</b-button>
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
				userInput: undefined
			}
		},
		components: {
			playerData
		},
		computed: {
			validUserInput() {
				return !isNaN(this.userInput) && this.userInput.length !== 0;
			}
		},
		methods: {
			sendAnswer() {
				EventBus.$emit("answerSent", this.userInput);
				setTimeout(() => { //FIXA BÄTTRE LÖSNING
					this.userInput = "";
				}, 2000);
			}
		}
  }  
</script>

<style scoped>
.img_responsive {
  margin-top: 10rem;
}
</style>