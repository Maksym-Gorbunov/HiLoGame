<template>
  <templateFix v-bind:player="this.$store.getters.getUser"/>
</template>

<script>
  import { EventBus } from "../event-bus.js";
  import templateFix from "./templateFix.vue";

  export default {
		components: {
				templateFix
		},
		methods: {
			sendAnswer(e) {
				EventBus.$emit("answerSent", Number(e.target.value)); //Fixa mer hållbar lösning
			}
		}
  }  
</script>

<style scoped>
.img_responsive {
  margin-top: 10rem;
}
</style>