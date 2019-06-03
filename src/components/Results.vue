<template>
  <div>
    <b-modal id="modal-center" ref="my-modal" hide-footer title="Game Finished!">
      <div class="d-block text-center">
        <h3 v-if="$store.getters.getCurrentPlayer.type == 'user'">Congrats {{$store.getters.getCurrentPlayer.name}} you won!</h3>
        <h3 v-else>Better luck next time!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="restartGame()">Play Again</b-button>
    </b-modal>
  </div>
</template>

<script>
  export default {
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
    }
  }
</script>