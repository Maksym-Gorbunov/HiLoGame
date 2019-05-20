<template>
  <div>
    <b-img class="img-responsive" v-if="player.imgURL" v-bind:src="getImgUrl(player.imgURL)"></b-img>
    <div>{{player.name}}</div>
    <div>Score: {{player.score}}</div>
  </div>
</template>

<script>
import UserImage from "@/assets/User.png";
import RobotImage from "@/assets/Robot.png";
import AlbertImage from "@/assets/Albert.png";

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
          return;
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