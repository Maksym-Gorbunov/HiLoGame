<template>
    <b-img class="img-responsive" v-if="player.imgURL" v-bind:src="getImgUrl(player.imgURL)"></b-img>
    <!-- <b-img class="img-responsive" v-if="player.imgURL" v-bind:src="player.imgURL"></b-img> -->
    <b-img class="img-responsive" v-else-if="player.active" src= "http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png"></b-img>
</template>

<script>
import UserImage from "@/assets/User.png";
import RobotImage from "@/assets/Robot.png";
import AlbertImage from "@/assets/Albert.png";

export default {
    name: "User",
    props: [
    "player"
    ],
    data() {
        return {
        text: ''
        }
    },
    methods: {
        getImgUrl(img) {
      switch (img) {
        case 'User.png':
          return UserImage;
        case 'Albert.png':
          return AlbertImage;
        case 'Robot.png':
          return RobotImage;
        default:
          return;
      }
    },
    }
}
</script>

<style scoped>

img{

    height: 300px;
    padding-top: 10px;

}

</style>