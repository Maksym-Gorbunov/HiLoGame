<template>
    <templateFix v-bind:player="this.$store.getters.getUser"/>
</template>

<script>
import { EventBus } from "../event-bus.js";
import templateFix from './templateFix.vue'

export default {
    name: "User",
    props: {
    msg: String
    },
    components:{
        templateFix
    },
    data() {
        return {
        text: ''
        }
    }
};
</script>

<style scoped>

.img_responsive{
    margin-top: 10rem;
}
</style>