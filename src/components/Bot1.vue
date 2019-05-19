<template>
    <templateFix v-bind:player="this.$store.getters.getBot1" v-bind:guess="guess"/>    
</template>

<script>
import { EventBus } from '../event-bus.js';
import templateFix from './templateFix.vue';

export default {
    name: "Bot1",
    points: 0,    
    components:{
        templateFix
    },
    props: {
        msg: String
    },
    data() {
        return {
        guess: ''
        }
    },    
    methods: {
        autoGuess() {            //Någon smart algoritm för att gissa logiskt? (mha föregående fråga?)

            let min = this.$store.getters.getAnswerMin;  //Get min and max values from question 
            let max = this.$store.getters.getAnswerMax;

            if(min == null) {
                min = 1;                  
            }

            if(max == null) {                
                max = 1000000;
            }  

            let guess = randomNr(min, max)

            setTimeout(() => {
                this.guess = guess
                EventBus.$emit('answerSent', guess);
            }, 3000);                 
            
        },
        randomNr(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },    
};
</script>

<style>
</style>