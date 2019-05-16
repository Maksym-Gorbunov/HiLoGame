// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

<<<<<<< HEAD
// export default new Vuex.Store({
//     state: {
//         scoreToWin = 0,
//         gameActive = false,
//         roundActive = false,
//         players: [],
//         questions: [],
//         currentPlayer: null,
//         currentQuestion: null
//     },
//     mutations:{
//         setScoreToWin(state, value){
//             state.scoreToWin = value;
//         },
//         setGameActive(state, value){
//             state.gameActive = value;
//         },
//         setRoundActive(state, value){
//             state.roundActive = value;
//         },
//         setPlayers(state, value){
//             state.players = value;
//         },
//         setQuestions(state, value){
//             state.questions = value;
//         },
//         nextTurn(state){
//             if(state.turn < 2){
//                 state.turn++;
//             }
//             else{
//                 state.turn = 0;
//             }
//         }
//     },
//     getters:{
//         getScoreToWin(state){
//             return state.scoreToWin;
//         },
//         getGameActive(state){
//             return state.gameActive;
//         },
//         getRoundActive(state){
//             return state.roundActive;
//         },
//         getPlayers(state){
//             return state.players;
//         },
//         getQuestions(state){
//             return state.questions;
//         },
//         getCurrentPlayer(state){
//             return state.scoreToWin;
//         },
//         getCurrentQuestion(state){
//             return state.scoreToWin;
//         }
//     }
// })
=======
export default new Vuex.Store({
    state: {
        answerMin: 0,
        answerMax: 0,
        scoreToWin: 0,
        turn: 0,
        gameActive: false,
        roundActive: false,
        players: [],
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
        setQuestions(state, value){
            state.questions = value;
        },
        nextTurn(state){
            if(state.turn < 2){
                state.turn++;
                state.currentPlayer = state.players[state.turn];
            }
            else{
                state.turn = 0;
                state.currentPlayer = state.players[0];
            }
            state.answerMin = 0;
            state.answerMax = 0;
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
>>>>>>> 79d3c4fcabf057744588a2f301877d95431433cc
