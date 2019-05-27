<template>
    <b-col sm="1" md="3" lg="4" align-self="center">    <!-- div class speech-bubble: aktuell bot istället för getBot1-->
        <div class="speech-bubble" v-if="this.$store.getters.getBot1.active" v-bind:class="{active:this.$store.getters.getBot1.active}">
            <b-form-input v-model="guess" type="number" disabled></b-form-input>
        </div>
        <!--
        <b-form-textarea
        v-if="this.$store.getters.getBot1.active"
        v-bind:class="{active:this.$store.getters.getBot1.active}"
        id="textarea-no-resize"
        disabled
        rows="1"
        no-resize
        v-model="guess"
        ></b-form-textarea> -->
        <playerData v-bind:player="this.$store.getters.getBot1" v-bind:guess="guess"/>
    </b-col>
</template>

<script>
    import { EventBus } from "../event-bus.js";
    import playerData from "./playerData.vue";

    export default {
        name: "",
        points: 0,
        components: {
            playerData
        },
        data() {
            return {
            guess: ""
            };
        },
        methods: {
            autoGuess() {    //Skicka med svårighetsgrad hit?
            //Någon smart algoritm för att gissa logiskt? (mha föregående fråga?)

                let guess;
                let answerTime;
                let correctGuess = false;  //correctGuess is used if Einstein knows the answer                               
                let min = this.$store.getters.getAnswerMin; //Get min and max values from question
                let max = this.$store.getters.getAnswerMax;
                let middle = Math.round((max - min) / 2);

                if (min == null) {
                    min = 1;
                }

                if (max == null) {
                    max = 1000000;
                }

                //Egna metoder för varje case?
                switch (this.name) {   //Funkar this.name? eller måste man getCurrentPlayer?
                    case "Bot":
                        answerTime = randomNr(2000, 4000);
                        min = min + Math.round((middle - min) / 3);
                        max = max - Math.round((max - middle) / 3);
                        break;

                    case "Einstein":
                        answerTime = randomNr(0, 2000);
                        let chanceToCorrectAnswer = randomNr(0,100);
                        if(chanceToCorrectAnswer < 51) {
                            min = min + Math.round((middle - min) / 2);
                            max = max - Math.round((max - middle) / 2);
                        }
                        else {  //Einstein knows the answer
                            correctGuess = true;
                        }
                        break;

                    case "Monkey":  //Quick but random
                        answerTime = randomNr(1000, 2000);
                        break;

                    case "The thinker":  //Very slow but good thinker
                        answerTime = randomNr(8000, 10000);
                        min = min + Math.round((middle - min) / 2);
                        max = max - Math.round((max - middle) / 2);
                        break;

                    case "Dwarf":
                        answerTime = randomNr(3000, 5000);
                        min = min + Math.round((middle - min) / 4);
                        max = max - Math.round((max - middle) / 4);
                        break;
                
                    default:
                        answerTime = 3000;                        
                        break;
                }             
                
                if(!correctGuess) {   
                    this.guess = this.randomNr(min, max);
                }
                else {
                    this.guess = this.$store.getters.getCurrentQuestion.answer;
                }

                setTimeout(() => {
                    this.guess = guess;
                    EventBus.$emit("answerSent", guess);
                }, answerTime);
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
                if (!this.$store.getters.getBot1.active) {    //TODO: getBot1 måste ist vara aktuell bot
                    this.guess = "";//FIXA BÄTTRE LÖSNING
                    return;
                }
                this.autoGuess();  //Skicka med svårighetsgrad???????
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