<template>
    <b-col sm="1" md="3" lg="4" align-self="center">    <!-- div class speech-bubble: aktuell bot istället för getBot1-->
        
        <div class="speech-bubble" v-if="bot.active" v-bind:class="{active: bot.active}">
        <!-- <div class="speech-bubble" v-if="this.$store.getters.getCurrentPlayer.active" v-bind:class="{active:this.$store.getters.getCurrentPlayer.active}"> -->
            <b-form-input v-model="guess" type="number" disabled></b-form-input>
        </div>
        <!-- <playerData v-bind:player="this.$store.getters.getBot1" v-bind:guess="guess"/> -->
        <playerData v-bind:player="bot" v-bind:guess="guess"/>
    </b-col>
</template>

<script>
    import { EventBus } from "../event-bus.js";
    import playerData from "./playerData.vue";

    export default {
        name: "",
        points: 0,
        props: ['bot'],
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

                let difficulty = this.$store.getters.getCurrentQuestion.difficulty;
                let guess;
                let answerTime;
                //let correctGuess = false;  //correctGuess is used if Einstein knows the answer                               
                let min = this.$store.getters.getAnswerMin; //Get min and max values from question
                let max = this.$store.getters.getAnswerMax;
                let middle = Math.round((max - min) / 2);

                if (min == null) {
                    min = 1;
                }

                if (max == null) {
                    max = 1000000;
                }
                
                switch (this.name) {   //Funkar this.name? eller måste man ha getCurrentPlayer????
                    case "Bot":
                        answerTime = randomNr(1000, 2000);
                        guess = botBot(difficulty, min, max, middle);
                        break;

                    case "Einstein":
                        answerTime = randomNr(0, 1000);
                        guess = botEinstein(difficulty, min, max, middle);
                        break;

                    case "Monkey":  //Quick but random
                        answerTime = randomNr(0, 1000);
                        guess = botMonkey(difficulty, min, max, middle);
                        break;

                    case "The thinker":  //Very slow but good thinker
                        answerTime = randomNr(4000, 6000);
                        guess = botTheThinker(difficulty, min, max, middle);
                        break;

                    case "Dwarf":
                        answerTime = randomNr(1500, 2500);
                        guess = botDwarf(difficulty, min, max, middle);
                        break;
                
                    default:
                        answerTime = 2000;                        
                        break;
                }             
                
                /*if(!correctGuess) {   
                    guess = this.randomNr(min, max);
                }
                else {
                    guess = this.$store.getters.getCurrentQuestion.answer;
                }*/

                setTimeout(() => {
                    this.guess = guess;
                    EventBus.$emit("answerSent", guess);
                }, answerTime);
            },
            botBot(difficulty, min, max, middle) {                

                if(difficulty == "easy") {
                    min = min + Math.round((middle - min) / 4);
                    max = max - Math.round((max - middle) / 4);
                }
                else if(difficulty == "medium") {
                    min = min + Math.round((middle - min) / 3);
                    max = max - Math.round((max - middle) / 3);
                }
                else {
                    min = min + Math.round((middle - min) / 2);
                    max = max - Math.round((max - middle) / 2);
                }

                return this.randomNr(min, max);
            },
            botEinstein (difficulty, min, max, middle) {

                let correctGuess = false;  //correctGuess is used if Einstein knows the answer   
                let chanceToCorrectAnswer = randomNr(0,100);

                if(difficulty == "easy") {
                    if(chanceToCorrectAnswer < 31) {  //Einstein knows the answer
                        correctGuess = true;                     
                    }
                    else {  
                        min = min + Math.round((middle - min) / 3);
                        max = max - Math.round((max - middle) / 3);
                    }
                }
                else if(difficulty == "medium") {
                    if(chanceToCorrectAnswer < 51) {  //Einstein knows the answer
                        correctGuess = true;                        
                    }
                    else {  
                        min = min + Math.round((middle - min) / 2);
                        max = max - Math.round((max - middle) / 2);
                    }
                }
                else {
                    if(chanceToCorrectAnswer < 71) {  //Einstein knows the answer
                        correctGuess = true;  
                    }
                    else {  
                        min = middle - Math.round((middle - min) / 10);
                        max = middle + Math.round((max - middle) / 10);
                    }
                }                

                if(correctGuess) {   
                    return this.$store.getters.getCurrentQuestion.answer;                    
                }
                else {
                    return this.randomNr(min, max);
                }
            },
            botMonkey(difficulty, min, max, middle) {
                // test
                if(difficulty == "easy"){
                    min = min + Math.round((middle - min) / 6);
                    max = max - Math.round((max - middle) / 6);
                }
                //
                else if(difficulty == "medium") {
                    min = min + Math.round((middle - min) / 6);
                    max = max - Math.round((max - middle) / 6);
                }
                else {
                    min = min + Math.round((middle - min) / 5);
                    max = max - Math.round((max - middle) / 5);
                }

                return this.randomNr(min, max);
            },
            botTheThinker (difficulty, min, max, middle) {                

                if(difficulty == "easy") {
                    min = min + Math.round((middle - min) / 3);
                    max = max - Math.round((max - middle) / 3);
                }
                else if(difficulty == "medium") {
                    min = min + Math.round((middle - min) / 2);
                    max = max - Math.round((max - middle) / 2);
                }
                else {
                    min = middle - Math.round((middle - min) / 10);
                    max = middle + Math.round((max - middle) / 10);
                }

                return this.randomNr(min, max);
            },
            botDwarf (difficulty, min, max, middle) {    //Alltid gissa lågt       

                if(difficulty == "easy") {
                    min = min + Math.round((middle - min) / 5);
                    max = max - Math.round((max - middle) / 5);
                }
                else if(difficulty == "medium") {
                    min = min + Math.round((middle - min) / 4);
                    max = max - Math.round((max - middle) / 4);
                }
                else {
                    min = min + Math.round((middle - min) / 3);
                    max = max - Math.round((max - middle) / 3);
                }

                return this.randomNr(min, max);
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
                if (!this.$store.getters.getCurrentPlayer.active) {    //TODO: funkar getCurrentPlayer istället för getBot1???
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