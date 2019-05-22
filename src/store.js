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
            imgURL: "User.png",
            active: false
        },
        bot1: {
            type: "bot",
            name: "Bot",
            score: 0,
            imgURL: "Robot.png",
            active: false
        },
        bot2: {
            type: "bot",
            name: "Einstein",
            score: 0,
            imgURL: "Albert.png",
            active: false
        },
        bot3: {
            type: "bot",
            name: "Monkey",
            score: 0,
            imgURL: "Monkey.png",
            active: false
        },
        bot4: {
            type: "bot",
            name: "The thinker",
            score: 0,
            imgURL: "Thinker.png",
            active: false
        },
        bot5: {
            type: "bot",
            name: "Dwarf",
            score: 0,
            imgURL: "Dwarf.png",
            active: false
        },
        players: [],
        questions: [],
        currentPlayer: null,
        currentQuestion: null,
        data: [] //maks 
    },
    mutations:{
        initPlayers(state){
            state.players.push(state.user);
            state.players.push(state.bot1);
            state.players.push(state.bot2);
        },
        setData(state, data){
            state.data = data;
        },
        setAnswerMin(state, value){
            state.answerMin = value;
        },
        setAnswerMax(state, value){
            state.answerMax = value;
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
            if(state.currentPlayer === null){
                state.currentPlayer = state.players[0];
            }
            else{
                let indexOfCurrentPlayer = state.players.findIndex(i => i.active);
                state.currentPlayer.active = false;

                if (indexOfCurrentPlayer < 2) {
                    state.currentPlayer = state.players[indexOfCurrentPlayer + 1];
                }
                else{
                    state.currentPlayer = state.players[0];
                }
            }

            state.currentPlayer.active = true;
        },
        nextQuestion(state){
            if(state.currentQuestion == null){
                state.currentQuestion = state.questions[0];
            }
            else{
                let indexOfCurrentQuestion = state.questions.findIndex(i => i.question == state.currentQuestion.question);

                state.currentQuestion = state.questions[indexOfCurrentQuestion + 1];
            }
        }
    },
    getters:{
        getAnswerMin(state){
            return state.answerMin;
        },
        getAnswerMax(state){
            return state.answerMax;
        },
        getScoreToWin(state){
            return state.scoreToWin;
        },
        getData(state){
            return state.data;
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
