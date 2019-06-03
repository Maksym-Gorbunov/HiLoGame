<template>
    <b-col>   
        <div class="speech-bubble" v-if="bot.active" v-bind:class="{active: bot.active}">
            <b-form-input v-model="guess" type="number" disabled></b-form-input>
        </div>
        <br>
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

                let difficulty = this.$store.getters.getCurrentQuestion.difficulty;  //Loads diffuculty level
                let timeLimit = this.$store.getters.getTimeLimit;  //Collecting time limit from store to use for setting different time limits 
                let guess;  
                let answerTime;  //The time a bot put on thinking before guessing
                let min = this.$store.getters.getAnswerMin; //Get min and max values from question
                let max = this.$store.getters.getAnswerMax; //Min and max are used for deciding the guessing interval
                let middle = Math.round((max + min) / 2);  //Calculation for deciding middle between min and max

                //If there is no min or max they are set to a default value
                if (min == null) {
                    min = 1;
                }

                if (max == null) {
                    max = 1000000;
                }
                
                //Switch statement with each case representing each bot and calling for respective method
                switch (this.bot.name) {   
                    case "Bot":
                        answerTime = this.randomNr(timeLimit * 0.1, timeLimit * 0.3);  //Calling method randomNr to randomize thinking time
                        guess = this.botBot(difficulty, min, max, middle);
                        break;

                    case "Einstein":
                        answerTime = this.randomNr(0, timeLimit * 0.1);
                        guess = this.botEinstein(difficulty, min, max, middle);
                        break;

                    case "Monkey":  
                        answerTime = this.randomNr(0, timeLimit * 0.1);
                        guess = this.botMonkey(difficulty, min, max, middle);
                        break;

                    case "The thinker":  
                        answerTime = this.randomNr(timeLimit * 0.8, timeLimit * 1.2);
                        guess = this.botTheThinker(difficulty, min, max, middle);
                        break;

                    case "Dwarf":
                        answerTime = this.randomNr(timeLimit * 0.4, timeLimit * 0.6);
                        guess = this.botDwarf(difficulty, min, max, middle);
                        break;
                
                    default:
                        answerTime = 2000;                        
                        break;
                }    
                //Timeout for delaying the bots guess
                if (timeLimit > answerTime) {
                    setTimeout(() => {
                        this.guess = guess;
                        this.answerSent = true;
                        this.$store.commit("stopTimer");
                        EventBus.$emit("answerSent", guess);  //Eventbus directing the guesses to the game leader
                    }, answerTime);
                }
            },

            //Regular bot, nothing more nothing less
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

                return this.randomNr(min, max);  //Calling method randomNr to randomize a guess
            },

            //Super smart bot, sometimes knows the answer
            botEinstein (difficulty, min, max, middle) {  

                let realMin = min;  //Saving incoming min and max to make shure the bot cant guess on those values
                let realMax = max;
                let correctAnswer = this.$store.getters.getCurrentQuestion.answer;  //Collecting the correct answer
                let correctGuess = false;  //correctGuess is used if Einstein knows the answer   
                let chanceToCorrectGuess = this.randomNr(0,100);  //Method randomNr used to randomize a % value deciding if Einstein knows the answer

                //Einstein knows on what side of the "middle" the correct answer is
                if(correctAnswer < middle) {
                    max = middle;   
                }
                else if(correctAnswer > middle) {
                    min = middle;  
                }

                if(difficulty == "easy") {
                    if(chanceToCorrectGuess < 31) {  //Einstein knows the answer if chanceToCorrectGuess is under 31 (30% chance)
                        correctGuess = true;  //correctGuess gets the value true to indicate Einstein knows the answer
                    }
                    else {  
                        min = min + Math.round((correctAnswer - min) / 3);  //Einstein works on the correct answer instead of "middle"
                        max = max - Math.round((max - correctAnswer) / 3);
                    }
                }
                else if(difficulty == "medium") {
                    if(chanceToCorrectGuess < 51) {  //Einstein knows the answer if chanceToCorrectGuess is under 51 (50% chance)
                        correctGuess = true;  //correctGuess gets the value true to indicate Einstein knows the answer                 
                    }
                    else {  
                        min = min + Math.round((correctAnswer - min) / 2);  //Einstein works on the correct answer instead of "middle"
                        max = max - Math.round((max - correctAnswer) / 2);
                    }
                }
                else {
                    if(chanceToCorrectGuess < 71) {  //Einstein knows the answer if chanceToCorrectGuess is under 71 (70% chance)
                        correctGuess = true;  //correctGuess gets the value true to indicate Einstein knows the answer
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
                    //Comparing min and max to realMin and realMax to make shure that the bot cant guess on those values
                    if(min <= realMin) {
                        min = realMin + 1;
                    }
                    if(max >= realMax) {
                        max = realMax - 1;
                    }
                    return this.randomNr(min, max);  //Calling method randomNr to randomize a guess
                }
            },

            //The monkey is crazy and dont know much
            botMonkey(difficulty, min, max, middle) {
                
                if(difficulty == "medium") {
                    min = min + Math.round((middle - min) / 10);
                    max = max - Math.round((max - middle) / 10);
                }
                else if(difficulty == "hard"){
                    min = min + Math.round((middle - min) / 5);
                    max = max - Math.round((max - middle) / 5);
                }

                return this.randomNr(min, max);  //Calling method randomNr to randomize a guess
            },

            //Very slow but good thinker, sometimes takes too long time
            botTheThinker (difficulty, min, max, middle) {    

                let realMin = min;  //Saving incoming min and max to make shure the bot cant guess on those values
                let realMax = max;
                let correctAnswer = this.$store.getters.getCurrentQuestion.answer;  //Collecting the correct answer
                
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
                
                //Comparing min and max to realMin and realMax to make shure that the bot cant guess on those values
                if(min <= realMin) {
                    min = realMin + 1;
                }
                if(max >= realMax) {
                    max = realMax - 1;
                }

                return this.randomNr(min, max);  //Calling method randomNr to randomize a guess
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

                return this.randomNr(min, max);  //Calling method randomNr to randomize a guess
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