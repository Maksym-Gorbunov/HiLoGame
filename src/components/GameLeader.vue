<template>
  <b-container fluid class="text-center">
    <b-row align-v="center">
    </b-row>
    <b-row>
    <b-col align-self="end">
      <b-button class="rules">Rules</b-button>
    </b-col>
    </b-row>
    <b-row class="justify-content-md-center"> 
      <b-col col lg=2>
        <b-img src="https://cdn.pixabay.com/photo/2017/12/21/10/30/mascot-3031512_960_720.png" height="400px"></b-img>
      </b-col>
      <b-col col lg=2>
        <b-row>
        <b-card style="max-width: 20rem;">
          <b-card-text width="100">
            Fråga ställs i denna rutan! Frågor på det?
          </b-card-text>
        </b-card>
        </b-row>
        <br />
        <b-row>
                <b-alert variant="success" show>Success Alert</b-alert>
                <b-alert variant="danger" show>För högt/För lågt</b-alert>
        </b-row>
      </b-col>
    </b-row>
    <b-row>&nbsp;</b-row>
  </b-container>
</template>
  <script>
export default {
  name: "GameLeader",
  props: {
    msg: String
  },
  data() {
      return {
        text: ''
      }
    },
    created() {
      this.$store.commit("setGameActive", true);
      this.newRound();
    },
    methods: {
      newRound() {
        this.$store.commit("nextQuestion"); //Fixa i store
        this.$store.commit("nextTurn"); //Fixa i store
        this.$store.commit("setRoundActive", true);
        //TODO
        //Set min/max. Hur löser vi?
        //Var skriver vi ut frågan?
      },
      checkAnswer(answer) {
        if (answer > this.$store.getters.getCurrentQuestion.answer) {
          //TODO - Vid fel för högt svar?
          //Feedback skrivs var?
          if (answer < this.$store.getters.getAnswerMax) { //Kontrollera hur vi gör med min/max
            this.$store.commit("setAnswerMax", answer);
          }
          return false;
        } else if (answer < this.$store.getters.getCurrentQuestion.answer) {
          //TODO - Vid fel för lågt svar?
          //Feedback skrivs var?
          if (answer > this.$store.getters.getAnswerMin) { //Kontrollera hur vi gör med min/max
            this.$store.commit("setAnswerMin", answer);
          }
          return false;
        } else {
          return true;
        }
      },
    },
    mounted() {
      EventBus.$on("answerSent", (answer) => {
        setTimeout(() => {
          if (this.checkAnswer(answer)) {
            this.$store.getters.getCurrentPlayer.score++; //Var Gustavs punkt men då jag(Anton) kontrollerar svaret så passar det bäst in här
            if (this.$store.getters.getCurrentPlayer.score === this.$store.getters.getScoreToWin) {
              this.$store.commit("setGameActive", false);
              //TODO - Vid Vinst?
              //Vinnarfras?
              //Knapp för att spela igen?
            } else {
              //TODO - Vid rätt svar?
              //Feedback skrivs var?
              //Knapp för att gå till nästa fråga eller automatiskt?
            }
            this.$store.commit("setRoundActive", false);
          } else {
            this.$store.commit("nextTurn");
          }
          }, 2000);
      });
    }
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
 margin: 40px 0 0;
}
ul {
 list-style-type: none;
 padding: 0;
}
li {
 display: inline-block;
 margin: 0 10px;
}
a {
 color: #42b983;
}

.imgDiv{
 padding: 3rem;
}

.jumbotron{
 background: #ee0979;  /* fallback for old browsers */
 background: -webkit-linear-gradient(to right, #ff6a00, #ee0979);  /* Chrome 10-25, Safari 5.1-6 */
 background: linear-gradient(to right, #ff6a00, #ee0979); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 background-size: cover;
 height: 100vh;
 width: 100vh;

}

.submit{
 background: #000000;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.submit:hover{
 cursor: pointer;
   box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
   transform: translateY(-0.1rem);
   transition: transform 150ms;
}

.rules{
  background: #000000;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.rules:hover{
 cursor: pointer;
   box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
   transform: translateY(-0.1rem);
   transition: transform 150ms;
}

.formss{
 margin: 2rem;
 margin-left: 20rem;

}

.img{
 width: 200px;
 display: flex;


}

.rules{

 float:right;
}

.imageRow{
 margin-left: 17rem;
 display: flex;
}

.boxed {
 border: 1px solid green ;
}
</style>