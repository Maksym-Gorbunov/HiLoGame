import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        answerMin: 0,
        answerMax: 0,
        scoreToWin: 0,
<<<<<<< HEAD
=======
        turn: 0,
>>>>>>> a41f94804738e6aa52d79d66834862f40316061f
        gameActive: false,
        roundActive: false,
        player: {
            name: "",
            score: 0,
        },
        bot1: {
            name: "bot1",
            score: 0,
        },
        bot2: {
            name: "bot2",
            score: 0,
        },
        players: [player, bot1, bot2],
        questions: [],
        currentPlayer: null,
        currentQuestion: null
    },
    mutations:{
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
        setPlayerName(state, name){
            state.player.name = name;
        },
        setQuestions(state, data){
            state.questions = data;
            console.log('question:' + data[0].question)
            console.log('question:' + data[0].answer)
            console.log('question:' + data[0].difficulty)
        },
        nextTurn(state){
            let indexOfCurrentPlayer = players.indexOf(state.currentPlayer);

            if (indexOfCurrentPlayer < 2) {
                state.currentPlayer = state.players[indexOfCurrentPlayer++];
            }
            else{
                state.currentPlayer = state.players[0];
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
        getPlayers(state){
            return state.players;
        },
        getQuestions(state){
            return state.questions;
        },
        getCurrentPlayer(state){
            return state.scoreToWin;
        },
        getCurrentQuestion(state){
            return state.scoreToWin;
        }
    }
})
