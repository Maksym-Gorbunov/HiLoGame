import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        timerMax: 100,
        timerValue: 100,
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
        initPlayers(state, players){
            console.log('initPlayers...')
            console.log(players.userName)
            console.log(players.bot1Name)
            console.log(players.bot2Name)
            // can delete set and get username in store.js, dont need to call set username in start.vue

            state.user.name = players.userName;
            state.players.push(state.user);

            switch(players.bot1Name){
                case "Bot":
                    state.players.push(state.bot1)
                    break
                case "Einstein":
                    state.players.push(state.bot2)
                    break
                case "Monkey":
                    state.players.push(state.bot3)
                    break
                case "The thinker":
                    state.players.push(state.bot4)
                    break
                case "Dwarf":
                    state.players.push(state.bot5)
                    break
                default: break
            }

            switch(players.bot2Name){
                case "Bot":
                    state.players.push(state.bot1)
                    break
                case "Einstein":
                    state.players.push(state.bot2)
                    break
                case "Monkey":
                    state.players.push(state.bot3)
                    break
                case "The thinker":
                    state.players.push(state.bot4)
                    break
                case "Dwarf":
                    state.players.push(state.bot5)
                    break
                default: break
            }

            console.log("<<<"+ state.players[0].name)
            console.log("<<<"+ state.players[1].name)
            console.log("<<<"+ state.players[2].name)
            // state.players.push(state.bot2);
        },
        setData(state, data){
            state.data = data;
        },
        deleteDataItem(state, item){
            state.data = state.data.filter(function(e) { return e !== item })
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
            // console.log(state.user.name);
        },
        setQuestions(state, data){
            state.questions = data;
            // console.log('question:' + data[0].question)
            // console.log('question:' + data[0].answer)
            // console.log('question:' + data[0].difficulty)
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
        },
        startTimer(state){
            state.timerValue = 100;
            var loop = setInterval(() => {
                if(state.timerValue == 0){
                    clearInterval(loop);
                }
                else{
                    state.timerValue -= 1;
                }
            }, 50);
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
        getBot3(state){
            return state.bot3;
        },
        getBot4(state){
            return state.bot4;
        },
        getBot5(state){
            return state.bot5;
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
