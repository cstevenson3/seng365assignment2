<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>
        
        <div>
            <div style="float:left">
                <h4>Sort By</h4>
            </div>
            <div style="float:left" v-for="sortOption in sortOptions">
                <input v-model="petitionSort" type="radio" name="sort" v-bind:value=sortOption.name v-on:change="updateFilters()">
                <label for=sortOption.name>{{sortOption.description}}</label><br>
            </div>
            <div style="clear:both;"></div>
        </div>

        <div>
            <div style="float:left">
                <h4>Category</h4>
            </div>
            <div style="float:left">
                <input v-model="petitionCategory" type="radio" name="category" v-bind:value="any" v-on:change="updateFilters()">
                <label for="any">Any</label><br>
            </div>
            <div style="float:left" v-for="category in petitionCategories">
                <input v-model="petitionCategory" type="radio" name="category" v-bind:value=category.categoryId>
                <label for=category.categoryId>{{category.name}}</label><br>
            </div>
            <div style="clear:both;"></div>
        </div>

        <div>
            <form style="float:left" @submit.prevent v-on:submit="updateFilters(); return false;">
                <input v-model="search" placeholder="search" v-on:change="updateFilters()" />
                <div style="clear:both;"></div>
                <input type="submit" value="Update Filters"/>
            </form>
            <div style="clear:both;"></div>
        </div>

        <div>
            <div style="float:left">
            Results per page
            <input v-model="count" v-on:change="updateFilters()" />
            </div>

            <div style="float:left">
            Page
            <input type="number" v-model="page" v-on:change="updateFilters()" />
            </div>
            <div style="clear:both;"></div>
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
                petitions: [],

                petitionSort: "SIGNATURES_DESC",
                search: "",
                petitionCategory: "any",

                count: 10,
                page: 1,

                petitionCategories: [],
                sortOptions: [{name:"SIGNATURES_DESC", description:"# of Signatures Descending"}, 
                            {name:"SIGNATURES_ASC", description:"# of Signatures Ascending"},
                            {name:"ALPHABETICAL_ASC", description:"Alphabetical"},
                            {name:"ALPHABETICAL_DESC", description:"Reverse Alphabetical"}],
        }
    },

    mounted: function() {
        this.getPetitions();
        this.getPetitionCategories();
    },

    methods: {
        getPetitions: function(options) {
            let params = {};
            if(this.search != "") {
                params.q = this.search;
            }
            if(this.petitionCategory != "any") {
                params.categoryId = this.petitionCategory;
            }
            params.sortBy = this.petitionSort;
            params.startIndex = (this.page - 1) * this.count;
            params.count = this.count;
            this.$http.get('http://localhost:4941/api/v1/petitions', {params: params})
            .then((response) => {
                this.petitions = response.data;
                if(this.petitions.length == 0 && this.page != 0) {
                    alert("No more pages");
                    this.page -= 1;
                    this.getPetitions();
                }
            })
            .catch((error) => {
                alert(error.response.statusText);
                this.error = error;
                this.errorFlag = true;
            });
        },

        getPetitionCategories: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions/categories')
            .then((categoriesResponse) => {
                this.petitionCategories = categoriesResponse.data;
            })
            .catch((error) => {
                alert(error.response.statusText);
                this.error = error;
                this.errorFlag = true;
            });
        },

        updateFilters: function() {
            this.getPetitions();
        },

        petitionPhoto: function(petitionId) {
            return "http://localhost:4941/api/v1/petitions/" + petitionId + "/photo";
        }
    }
}
</script>