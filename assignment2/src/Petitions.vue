<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>
        <div id="petitions">
            <table>
                <tr>
                    <td>Title</td>
                    <td>Category</td>
                    <td>Author</td>
                    <td>Signatures</td>
                    <td>Photo</td>
                </tr>
                <tr v-for="petition in petitions">
                    <td><router-link :to="{ name: 'petition', params: { petitionId: petition.petitionId }}">{{ petition.title }}</router-link></td>
                    <td>{{ petition.category }}</td>
                    <td>{{ petition.authorName }}</td>
                    <td>{{ petition.signatureCount }}</td>
                    <td>
                        <img :src=petitionPhoto(petition.petitionId) height="40" width="40">
                    </td>
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
                petitions: []
        }
    },

    mounted: function() {
        this.getPetitions();
    },

    methods: {
        getPetitions: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions')
            .then((response) => {
                this.petitions = response.data;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        petitionPhoto: function(petitionId) {
            return "http://localhost:4941/api/v1/petitions/" + petitionId + "/photo";
        }
    }
}
</script>