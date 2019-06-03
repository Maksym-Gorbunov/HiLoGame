<template>
  <div>
    <b-modal id="modal-center" ref="my-modal" hide-footer title="Game Finished!">
      <div class="d-block text-center">
        <h3 v-if="player.type == 'user'">Congrats {{player.name}} you won!</h3>
        <h3 v-else>{{player.name}} won! Better luck next time!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="restartGame()">Play Again</b-button>
    </b-modal>
  </div>
</template>

<script>
  import { EventBus } from "../event-bus.js";

  export default {
    data() {
      return {
        player: {
          type: "",
          name: ""
        }
      }
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      restartGame(){
        this.$emit("restart-game");
      }
    },
    beforeDestroy() {
      EventBus.$off("answerSent");
    },
    mounted() {
      EventBus.$on("winnerNameSent", player => {
        this.player = player;
      });
    },
    beforeDestroy() {
      EventBus.$off("answerSent");
    }
  }
</script>