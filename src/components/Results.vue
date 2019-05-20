<template>
  <!-- <div>
    <h1>RESULTS</h1>
  </div>        -->
  <!-- Modal, shows on game finish -->
    <div class="modal fade" id="modal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Yahtzee</h4>
          </div>
          <div class="modal-body">
            <p>Result: 666</p>
          </div>
          <div class="modal-footer">
            <button
              type="reset"
              class="btn btn-default"
              id="play_again_btn"
              <!-- @click="playAgain" -->
            >Play Again</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>


export default {
  name: "Results",
  components:{
      
  },
  props: {
  },
  data() {
      return {
      guess: ''
      }
  },    
  methods: {
  }
}
</script>

<style>

</style>
