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
        players: [],
        questions: [],
        currentPlayer: null,
        currentQuestion: null
    },
    mutations:{
        initPlayers(state){
            state.players.push(state.player);
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
        setPlayerName(state, name){
            state.player.name = name;
            console.log(state.player.name);
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
