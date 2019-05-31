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
            guess: undefined,
            answerSent: false
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
                
                switch (this.bot.name) {   //Funkar this.name? eller måste man ha getCurrentPlayer????
                    case "Bot":
                        answerTime = this.randomNr(1000, 2000);
                        guess = this.botBot(difficulty, min, max, middle);
                        break;

                    case "Einstein":
                        answerTime = this.randomNr(0, 1000);
                        guess = this.botEinstein(difficulty, min, max, middle);
                        break;

                    case "Monkey":  //Quick but random
                        answerTime = this.randomNr(0, 1000);
                        guess = this.botMonkey(difficulty, min, max, middle);
                        break;

                    case "The thinker":  //Very slow but good thinker
                        answerTime = this.randomNr(4000, 6000);
                        guess = this.botTheThinker(difficulty, min, max, middle);
                        break;

                    case "Dwarf":
                        answerTime = this.randomNr(1500, 2500);
                        guess = this.botDwarf(difficulty, min, max, middle);
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
                    this.answerSent = true;
                    this.$store.commit("stopTimer");
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

            //Super smart bot, sometimes knows the answer
            botEinstein (difficulty, min, max, middle) {  

                let correctAnswer = this.$store.getters.getCurrentQuestion.answer;
                let correctGuess = false;  //correctGuess is used if Einstein knows the answer   
                let chanceToCorrectGuess = this.randomNr(0,100);

                //Einstein knows on what side of the "middle" the correct answer is
                if(correctAnswer < middle) {
                    max = middle;   
                }
                else if(correctAnswer > middle) {
                    min = middle;  
                }

                if(difficulty == "easy") {
                    if(chanceToCorrectGuess < 31) {  //Einstein knows the answer
                        correctGuess = true;                     
                    }
                    else {  
                        min = min + Math.round((correctAnswer - min) / 3);  //Einstein works on the correct answer instead of "middle"
                        max = max - Math.round((max - correctAnswer) / 3);
                    }
                }
                else if(difficulty == "medium") {
                    if(chanceToCorrectGuess < 51) {  //Einstein knows the answer
                        correctGuess = true;                        
                    }
                    else {  
                        min = min + Math.round((correctAnswer - min) / 2);  //Einstein works on the correct answer instead of "middle"
                        max = max - Math.round((max - correctAnswer) / 2);
                    }
                }
                else {
                    if(chanceToCorrectGuess < 71) {  //Einstein knows the answer
                        correctGuess = true;  
                    }
                    else {  
                        min = correctAnswer - Math.round((correctAnswer - min) / 10);  //Einstein works on the correct answer instead of "middle"
                        max = correctAnswer + Math.round((max - correctAnswer) / 10);
                    }
                }                

                if(correctGuess) {   //Einstein knows the answer
                    return correctAnswer;           
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

            //Very slow but good thinker, sumtimes takes too long time
            botTheThinker (difficulty, min, max, middle) {    

                let correctAnswer = this.$store.getters.getCurrentQuestion.answer;
                
                //The Thinker knows on what side of the "middle" the correct answer is
                if(correctAnswer < middle) {
                    max = middle;   
                }
                else if(correctAnswer > middle) {
                    min = middle;  
                }

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

            //The dwarf allways guess on lower values close to min  
            botDwarf (difficulty, min, max, middle) {      

                if(difficulty == "easy") {                    
                    max = min + Math.round((middle - min) / 10);
                }
                else if(difficulty == "medium") {                    
                    max = min + Math.round((middle - min) / 5);
                }
                else {                    
                    max = min + Math.round((middle - min) / 2);
                }

                return this.randomNr(min, max);
            },
            randomNr(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        },
        computed: {
            activePlayer() {
                return this.bot.active;
            }
        },
        watch: {
            activePlayer() {
                if (!this.activePlayer) {
                    this.guess = undefined;
                    this.answerSent = false;
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