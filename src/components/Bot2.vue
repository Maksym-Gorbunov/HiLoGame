<template>
</template>

<script>
import { EventBus } from './event-bus.js';

export default {
    name: "Bot2",
    points: 0,
    props: {
    msg: String
    },
    data() {
        return {
        text: ''
        }
    },
    methods: {
        autoGuess() {            

            let min = this.$store.getters.getAnswerMin;  //Get min and max values from question 
            let max = this.$store.getters.getAnswerMax;

            let guess = randomNr(min, max);  

            //Vad händer här? hur hanteras gissningen?     return eller skicka?
            //Hur plussa poäng?
            EventBus.$emit('bot-guessings', guess);
            
        },
        randomNr(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    mutations: {
        addPoint() {     //Använda detta?
            points++;
        }
    }
};
</script>

<style>
</style>