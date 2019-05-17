<template>
    <templateFix v-bind:player="this.$store.getters.getBot2" v-bind:guess="guess"/>
</template>

<script>
import { EventBus } from '../event-bus.js';
import templateFix from './templateFix.vue';

export default {
    name: "Bot2",
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
        autoGuess() {            

            let min;
            let max;

            if(getAnswerMin == null || getAnswerMax == null) {
                min = this.$store.getters.getAnswerMin;  //Get min and max values from question 
                max = this.$store.getters.getAnswerMax;
            }
            else {
                min = 1;
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