<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>
        <div id="petitions">
            <table>
                <tr v-for="petition in petitions">
                    <td>{{ petition.title }}</td>
                    <td><!--- view link here --></td>
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
        }
    }
}
</script>