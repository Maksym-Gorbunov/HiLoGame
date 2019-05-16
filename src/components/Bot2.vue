<template>
<div>
    <templateFix/>
</div>
</template>

<script>

import templateFix from './templateFix.vue'

export default {
    name: "Bot2",
    nrOfGuesses: 0,  //Nödvändig?   Gemensam?
    points: 0,
    guesses: [],  //Bara för aktuell fråga (även andras svar?), rensa efter rätt svar (Även om det är nån annan)
                  //...gemensam lista för gissningar som alla kan hantera?
    components:{
        templateFix

    },
    props: {
    msg: String
    },
    data() {
        return {
        text: ''
        }
    },
    methods: {
        autoGuess() {            //Ta emot max  eller hämta från frågan och lägga i variabler?
                                 //Denna spelaren ska gissa mer slumpartat, men hur slumpartat?

            let max = 2000000;  //Bestämma max efter antal siffror i svaret eller nåt?

            //Loop controlling unique guesses, looping when (while) the current guess has already been made
            do {
                let guess = randomNr(max);  //Vart kommer min och max från?
          
            } while(guesses.includes(guess));  //Funkar detta villkoret?   Om guesses[] är tom? 
            
            guesses = guess;  //Egen lista eller gemensam?

            //Vad händer här? hur hanteras gissningen?     return eller skicka?
        },
        randomNr(max) {
            return Math.floor(Math.random() * max);
        }
    }
};
</script>

<style>
</style>