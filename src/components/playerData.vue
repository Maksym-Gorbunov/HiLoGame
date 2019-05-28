<template>
  <div>
    <b-img class="mx-auto d-none d-md-block" v-if="player.imgURL" v-bind:src="getImgUrl(player.imgURL)"></b-img>
    <div>{{player.name}}</div>
    <div>Score: {{player.score}}</div>
    <div>
    <b-progress :value="counter" :max="max" show-progress animated></b-progress>
  </div>
  </div>
</template>

<script>
/*
Ska jag ha startTimer metod här?
setTimeout()
Sätt COUNTER till MAX i början på metod?
Ska jag ha små setTimeout() i metoden som decresear counter--?
Uppdatera getImgURL metoden?
Fler imports?
*/
import UserImage from "@/assets/User.png";
import RobotImage from "@/assets/Robot.png";
import AlbertImage from "@/assets/Albert.png";
import PlayerDefault from "@/assets/PlayerDefault.png";

export default {
  name: "User",
  props: ["player"],
  data() {
    return {
      text: ""
    };
  },
  methods: {
    getImgUrl(img) {
      switch (img) {
        case "User.png":
          return UserImage;
        case "Albert.png":
          return AlbertImage;
        case "Robot.png":
          return RobotImage;
        default:
          return PlayerDefault;
      }
    }
  }
};
</script>

<style scoped>
* {
  color: white;
}

img {
  height: 250px;
  padding-top: 10px;
}
</style>