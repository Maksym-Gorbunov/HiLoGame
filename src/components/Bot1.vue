<template>

</template>



<script>
export default {
    name: "Bot1",
    nrOfGuesses: 0,  //Nödvändig?   Gemensam?
    points: 0,
    guesses: [],  //Bara för aktuell fråga (även andras svar?), rensa efter rätt svar (Även om det är nån annan)
                  //...gemensam lista för gissningar som alla kan hantera?
    props: {
    msg: String
    },
    data() {
        return {
        text: ''
        }
    }
    methods: {
        autoGuess() {            //Någon smart algoritm för att gissa logiskt? (mha föregående fråga?)

            let min = this.$store.getters.getAnswerMin;
            let max = this.$store.getters.getAnswerMax;

            //Loop controlling unique guesses, looping when (while) the current guess has already been made
            do {
                let guess = randomNr(min, max);  //Vart kommer min och max från?
          
            } while(guesses.includes(guess));  //Funkar detta villkoret?   Om guesses[] är tom? 
            
            guesses = guess;  //Egen lista eller gemensam?

            //Vad händer här? hur hanteras gissningen?     return eller skicka?
        },
        randomNr(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};
</script>



<style>

</style>