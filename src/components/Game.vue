<template>
  <div>
    <GameLeader/>
    <b-container fluid class="text-center">
    <b-row align-v="center">
    <User/>
    <Bot1/>
    <Bot2/>
    </b-row>
    </b-container>   
  </div>
</template>

<script>
import GameLeader from './GameLeader.vue'
import User from './User.vue'
import Bot1 from './Bot1.vue'
import Bot2 from './Bot2.vue'


export default {
  name: 'game',
  components: {
    GameLeader,
    User,
    Bot1,
    Bot2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #5f2c82;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #49a09d, #5f2c82);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #49a09d, #5f2c82); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
