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
            imgURL: "https://banner2.kisspng.com/20180715/zq/kisspng-red-royalty-free-clip-art-confused-cartoon-5b4b22a2d9a6d5.1339546915316507228915.jpg",
            active: false
        },
        bot1: {
            type: "bot",
            name: "bot1",
            score: 0,
            imgURL: "https://library.kissclipart.com/20180902/ebw/kissclipart-cartoon-robots-clipart-robot-clip-art-8d5c25496d8a30ad.jpg",
            active: false
        },
        bot2: {
            type: "bot",
            name: "bot2",
            score: 0,
            imgURL: "https://library.kissclipart.com/20180915/xxe/kissclipart-einstein-salesforce-clipart-salesforce-com-service-d8b8f4e7390da218.png",
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
            return state.scoreToWin;
        },
        getCurrentQuestion(state){
            return state.scoreToWin;
        }
    }
})
