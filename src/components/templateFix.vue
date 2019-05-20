<template>
    <b-img class="img-responsive" v-if="player.imgURL" v-bind:src="player.imgURL"></b-img>
    <b-img class="img-responsive" v-else-if="player.active" src= "http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png"></b-img>
</template>

<script>
export default {
    name: "User",
    props: [
    "player"
    ],
    data() {
        return {
        text: ''
        }
    }
};
</script>

<style scoped>

img{

    height: 300px;
    padding-top: 10px;

}

</style>