<template>

<b-col sm="1" md="3" lg="4" align-self="center">
    <b-input-group v-if="user[0]">
        <b-form-input type="number" min="0.00"></b-form-input>
            <b-input-group-append>
                <b-button variant="outline-secondary">Button</b-button>
            </b-input-group-append>
    </b-input-group>
    <b-img class="img-responsive" v-if= "$store.players.imgURL" src="http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png"></b-img>
        <b-form-textarea v-else, id="textarea-no-resize" placeholder="Fixed height textarea" rows="3" no-resize>
        </b-form-textarea>
        <b-img class="img-responsive" src="http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png" alt="Responsive image"></b-img>

    <b-img class="img-responsive" v-if= "$store.players.imgURL" src="http://www.freespins24h.se/wp-content/uploads/2017/02/faq.png"></b-img>
</b-col>

</template>

<script>
export default {
    name: "User",
    props: {
    msg: String
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