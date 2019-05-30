<template>
  <div>
    <b-img class="img-responsive" v-if="player.imgURL" v-bind:src="getImgUrl(player.imgURL)"></b-img>
    <div>{{player.name}}</div>
    <div>Score: {{player.score}}</div>
    <div>
  </div>
  </div>
</template>

<script>
import UserImage from "@/assets/User.png";
import RobotImage from "@/assets/Robot.png";
import AlbertImage from "@/assets/Albert.png";
import DwarfImage from "@/assets/Dwarf.png";
import ThinkerImage from "@/assets/Thinker.png";
import MonkeyImage from "@/assets/Monkey.png";
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
        case "Dwarf.png":
          return DwarfImage;
        case "Thinker.png":
          return ThinkerImage;
        case "Monkey.png":
          return MonkeyImage;
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