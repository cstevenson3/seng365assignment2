<template>
    <div>
        <div style="float: right">
            <h2> Author: {{ petition.authorName }} </h2>
            <h3> City: {{ petition.authorCity }} </h3>
            <h3> Country: {{ petition.authorCountry }} </h3>
            <img :src=userPhoto(petition.authorId) height="200" width="200">
        </div>
        <div>
            <h1>{{ petition.title }}</h1>
            <h2>{{ petition.category }}</h2>
            <h3> {{ petition.closingDate ? "Closes " + Date(petition.closingDate) : "Closing date not set" }}</h3>
            <h3>Opened {{ Date(petition.createdDate) }}</h3>
            <img :src=petitionPhoto(petition.petitionId) height="200" width="200">
            <br>
            {{ petition.description }}
        </div>
        <br>
        <div>
            <div style="float: left">
                <h2>Share:</h2>
            </div>
            <div style="float: left">
                <a href="https://www.facebook.com" target="_blank">
                <img src="https://www.facebook.com/favicon.ico" width="40" height="40">
                </a>
            </div>
            <div style="float: left">
                <a href="https://www.twitter.com" target="_blank">
                <img src="https://www.twitter.com/favicon.ico" width="40" height="40">
                </a>
            </div>
            <div style="float: left">
                <a href="https://www.reddit.com" target="_blank">
                <img src="https://www.reddit.com/favicon.ico" width="40" height="40">
                </a>
            </div>
            <div style="clear:both;"></div>
        </div
        <br>
        <div>
            <h2>Signatures</h2>
            <table>
                <tr>
                    <td>Photo</td>
                    <td>Name</td>
                    <td>City</td>
                    <td>Country</td>
                <tr>
                <tr v-for="signature in signatures">
                    <td>
                        <img :src=userPhoto(signature.signatoryId) height="40" width="40">
                    </td>
                    <td>{{ signature.name }}</td>
                    <td>{{ signature.city }}</td>
                    <td>{{ signature.country }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
                error: "",
                errorFlag: false,
                petition: {},
                signatures: []
        }
    },

    mounted: function() {
        this.getPetition();
        this.getSignatures();
    },

    methods: {
        getPetition: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.petitionId)
            .then((response) => {
                this.petition = response.data;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },


        getSignatures: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.petitionId + "/signatures")
            .then((response) => {
                this.signatures = response.data;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        petitionPhoto: function(petitionId) {
            return "http://localhost:4941/api/v1/petitions/" + petitionId + "/photo";
        },

        userPhoto: function(userId) {
            return "http://localhost:4941/api/v1/users/" + userId + "/photo";
        }
    }
}
</script>