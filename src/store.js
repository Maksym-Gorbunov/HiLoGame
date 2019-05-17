import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        answerMin: null,
        answerMax: null,
        scoreToWin: 0,
        gameActive: false,
        roundActive: false,
        user: {
            type: "user",
            name: "",
            score: 0,
            imgURL: "https://png2.kisspng.com/sh/81e2d326ad9249faa6cd40de1336952b/L0KzQYm3V8E2N51oi5H0aYP2gLBuTgJmbF53hAtqbIT8Pbf5hfUua51uiJ9qcoSwc7F1hwV0bZUye9N7dHByfn68gsRjOmNmS6M5YUa3QnA8UMY3Pmc7T6MAM0G5RYGAUsMxPmk3RuJ3Zx==/kisspng-red-royalty-free-clip-art-confused-cartoon-5b4b22a310a642.5066666715316507230682.png",
            active: false
        },
        bot1: {
            type: "bot",
            name: "bot1",
            score: 0,
            imgURL: "https://png2.kisspng.com/sh/5878a499c5ea25cff39a8f5d608a9b60/L0KzQYm3UsE6N6hBfZH0aYP2gLBuTgJwapD5RdVqcoTyf7A0gBxqeF5miuY2cnBlf8W0VfE5amk4TKo7M0DmQIK1VsM6O2c1TaY6NUG8QIq5VcUzOWU4TpD5bne=/kisspng-robot-cartoon-clip-art-robot-5a8b8348230c01.6393605415190925521436.png",
            active: false
        },
        bot2: {
            type: "bot",
            name: "bot2",
            score: 0,
            imgURL: "https://png2.kisspng.com/sh/403e8989d3996fa5a9d02b918f7d2300/L0KzQYm3VMIyN6poiZH0aYP2gLBuTfFtapZ3jJ9uaX72hLbwjr1yfZD5feU2c3PsdbB7igN1NaVtfdH7ZYTsc7LzTgBpgaRuRdN1YnX1hH7sif50fJZuhp8AYXTlSIjthPI6bJJrSJCENkC5RYq3WcE2OmU4S6gBM0e6RoK6TwBvbz==/kisspng-albert-einstein-quotes-scientist-theoretical-physi-albert-einstein-5adb87fdb9daf0.9606590915243366377613.png",
            active: false
        },
        players: [],
        questions: [],
        currentPlayer: null,
        currentQuestion: null
    },
    mutations:{
        initPlayers(state){
            state.players.push(state.user);
            state.players.push(state.bot1);
            state.players.push(state.bot2);
        },
        setAnswerMin(state, value){
            state.answerMax = value;
        },
        setAnswerMax(state, value){
            state.answerMin = value;
        },
        setScoreToWin(state, value){
            state.scoreToWin = value;
        },
        setGameActive(state, value){
            state.gameActive = value;
        },
        setRoundActive(state, value){
            state.roundActive = value;
        },
        setPlayers(state, value){
            state.players = value;
        },
        setUserName(state, name){
            state.user.name = name;
            console.log(state.user.name);
        },
        setQuestions(state, data){
            state.questions = data;
            console.log('question:' + data[0].question)
            console.log('question:' + data[0].answer)
            console.log('question:' + data[0].difficulty)
        },
        nextTurn(state){
            let indexOfCurrentPlayer = state.players.findIndex(i => i.active);

            if (indexOfCurrentPlayer < 2) {
                state.currentPlayer = state.players[indexOfCurrentPlayer++];
            }
            else{
                state.currentPlayer = state.players[0];
            }
        },
        nextQuestion(state){
            if(state.currentQuestion == null){
                state.currentQuestion = state.questions[0];
            }
            else{
                let indexOfCurrentQuestion = state.questions.findIndex(i => i.question == state.currentQuestion.question);

                state.currentQuestion = state.questions[indexOfCurrentQuestion++];
            }
        }
    },
    getters:{
        getAnswerMin(state){
            return state.answerMax;
        },
        getAnswerMax(state){
            return state.answerMin;
        },
        getScoreToWin(state){
            return state.scoreToWin;
        },
        getGameActive(state){
            return state.gameActive;
        },
        getRoundActive(state){
            return state.roundActive;
        },
        getUser(state){
            return state.user;
        },
        getBot1(state){
            return state.bot1;
        },
        getBot2(state){
            return state.bot2;
        },
        getPlayers(state){
            return state.players;
        },
        getQuestions(state){
            return state.questions;
        },
        getCurrentPlayer(state){
            return state.currentPlayer;
        },
        getCurrentQuestion(state){
            return state.currentQuestion;
        }
    }
})
