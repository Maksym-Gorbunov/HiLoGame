<template>

<b-col sm="1" md="3" lg="4" align-self="center">
    <b-input-group v-if="this.$store.getters.getUser.active"
		 v-bind:class="{active:this.$store.getters.getUser.active}">
        <b-form-input v-model="userInput" type="number" ></b-form-input>
            <b-input-group-append>
                <b-button variant="info" v-on:click="sendAnswer()">Submit</b-button>
            </b-input-group-append>
    </b-input-group>
		 <templateFix v-bind:player="this.$store.getters.getUser"/>
  </b-col>
 
</template>

<script>
  import { EventBus } from "../event-bus.js";
  import templateFix from "./templateFix.vue";

  export default {
		data() {
			return {
				userInput: ""
			}
		},
		components: {
			templateFix
		},
		methods: {
			sendAnswer(e) {
				EventBus.$emit("answerSent", Number(this.userInput)); //Fixa mer hållbar lösning
			}
		}
  }  
</script>

<style scoped>
.img_responsive {
  margin-top: 10rem;
}

.button{
	background-color: black;
}
</style>