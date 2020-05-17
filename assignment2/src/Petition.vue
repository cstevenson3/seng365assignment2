<template>
    <div>
        <div style="float: right">
            <h2> Author: {{ petition.authorName }} </h2>
            <h3> City: {{ petition.authorCity }} </h3>
            <h3> Country: {{ petition.authorCountry }} </h3>
            <img :src=userPhoto(petition.authorId) height="200" width="200">
        </div>
        <div>
            <div v-if="ownPetition">
                <button 
                type="button" 
                class="btn btn-primary" 
                v-on:click="fillEditPetitionDetails" 
                data-toggle="modal" 
                data-target="#editPetitionModal"> 
                    Edit
                </button>
                <button 
                type="button" 
                class="btn btn-danger" 
                data-toggle="modal" 
                data-target="#deletePetitionModal"> 
                    Delete
                </button>
            </div>
            <h1>{{ petition.title }}</h1>
            <h2>{{ petition.category }}</h2>
            <h3> {{ petition.closingDate ? "Closes " + petition.closingDate : "Closing date not set" }}</h3>
            <h3>Opened {{ Date(petition.createdDate) }}</h3>
            <img :key=updateImage :src=petitionPhoto(petition.petitionId) height="200" width="200">
            <br>
            {{ petition.description }}
        </div>
        <br>

        <button 
        v-if="isLoggedIn() && !signedByUser"
        type="button" 
        class="btn btn-primary" 
        data-toggle="modal" 
        data-target="#signPetitionModal"> 
            Sign this petition
        </button>

        <button 
        v-if="isLoggedIn() && signedByUser"
        type="button" 
        class="btn btn-primary" 
        data-toggle="modal" 
        data-target="#unsignPetitionModal"> 
            Unsign this petition
        </button>

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

        <div 
        class="modal fade" 
        id="signPetitionModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="signPetitionModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="signPetitionModalLabel">Sign Petition</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Sign this petition:
                        <button type="button" data-dismiss="modal" v-on:click="signPetition()">
                            Sign
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div 
        class="modal fade" 
        id="unsignPetitionModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="unsignPetitionModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="unsignPetitionModalLabel">Unsign Petition</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Unsign this petition:
                        <button type="button" data-dismiss="modal" v-on:click="unsignPetition()">
                            Unsign
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div 
        class="modal fade" 
        id="deletePetitionModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="deletePetitionModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deletePetitionModalLabel">Delete Petition</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Delete this petition:
                        <button type="button" data-dismiss="modal" v-on:click="deletePetition()">
                            Delete
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div 
        class="modal fade" 
        id="editPetitionModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="editPetitionModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editPetitionModalLabel">Edit Petition</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent v-on:submit="editPetition(); return false;">
                            <input v-model="petitionTitle" placeholder="title" />
                            <textarea v-model="petitionDescription" placeholder="description" rows="5" cols="50"/>
                            <br>
                            <h5>Category</h5>           
                            <div v-for="category in petitionCategories">
                                <input v-model="petitionCategory" type="radio" name="category" v-bind:value=category.categoryId>
                                <label for=category.categoryId>{{category.name}}</label><br>
                            </div>
                            
                            <br>
                            <label for="petitionClosingDate">Closing Date</label>
                            <input id="petitionClosingDate" type="date" v-model="petitionClosingDate" />
                            <input type="file" id="petitionImageInput" ref="petitionImage" v-on:change="handlePetitionImage()"/>
                            <div id="result"></div>
                            <input type="submit" value="Edit Petition"/>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Close
                        </button>
                    </div>
                </div>
            </div>
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
                signatures: [],
                currentUser: {},
                ownPetition: false,

                // for editing
                petitionTitle:"",
                petitionDescription:"",
                petitionCategory: "",
                petitionCategories: [],
                petitionClosingDate: "",

                petitionImage: '',
                petitionImageData: null,
                petitionImageType: "",

                updateImage: 0, // vue key

                signedByUser: false
        }
    },

    mounted: function() {
        this.getPetition();
    },

    methods: {
        isLoggedIn: function () {
            return JSON.parse(localStorage.getItem('currentUser')) != null;
        },

        userCheck: function() {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.ownPetition = this.currentUser.userId == this.petition.authorId;
        },

        getPetition: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.petitionId)
            .then((response) => {
                this.petition = response.data;
                if(response.data.closingDate) {
                    this.petition.closingDate = Date(response.data.closingDate);
                }
                if(response.data.createdDate) {
                    this.petition.createdDate = Date(response.data.createdDate);
                }
                this.userCheck();
                this.getSignatures();
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        isSignedByUser: function () {
            this.userCheck();
            this.signedByUser = false;
            this.signatures.forEach((signature) => {
                if(signature.signatoryId == this.currentUser.userId) {
                    this.signedByUser = true;
                }
            });
        },

        fillEditPetitionDetails: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions/categories')
            .then((categoriesResponse) => {
                this.petitionCategories = categoriesResponse.data;
                for(let category of this.petitionCategories) {
                    if(this.petition.category == category.name) {
                        this.petitionCategory = category.categoryId;
                    }
                }
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
            this.petitionTitle = this.petition.title;
            this.petitionDescription = this.petition.description;
            this.petitionDate = this.petition.date;
        },

        handlePetitionImage: function() {
            this.petitionImage = this.$refs.petitionImage.files[0];
            this.petitionImageType = this.petitionImage.type;
            let reader = new FileReader();
            let vueInstance = this;
            reader.onload = function() {
                let arrayBuffer = this.result;
                let array = new Uint8Array(arrayBuffer);
                vueInstance.petitionImageData = array;
            }
            reader.readAsArrayBuffer(this.petitionImage);
        },

        editPetition: function() {
            let data = {};
            if(this.petitionTitle == "") {
                alert("Title is required");
                return;
            }
            if(this.petitionCategory == "") {
                alert("Category is required");
                return;
            }
            data.title = this.petitionTitle;
            data.categoryId = this.petitionCategory;
            if(this.description != "") {
                data.description = this.petitionDescription;
            }
            let uploadImage = false;
            if(this.petitionImageData != null) {
                uploadImage = true;
            }

            this.$http.patch('http://localhost:4941/api/v1/petitions/' + this.petition.petitionId, data)
            .then((petitionResponse) => {
                if(uploadImage) {
                    this.$http.put('http://localhost:4941/api/v1/petitions/' + this.petition.petitionId + '/photo', this.petitionImageData, {headers: {"Content-Type": this.petitionImageType}})                            
                    .then((imageResponse) => {
                        this.getPetition();
                        this.updateImage += 1;
                        alert("Petition updated successfully");
                    })
                    .catch((error) => {
                        this.getPetition();
                        this.error = error;
                        this.errorFlag = true;
                        alert("Petition updated successfully, except for its image");
                    });
                } else {
                    this.getPetition();
                    alert("Petition updated successfully");
                }
                $('#editPetitionModal').modal('toggle');
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        deletePetition: function() {
            this.$http.delete('http://localhost:4941/api/v1/petitions/' + this.petition.petitionId)
            .then((response) => {
                window.location.href = "/petitions";
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        signPetition: function() {
            this.$http.post('http://localhost:4941/api/v1/petitions/' + this.petition.petitionId + "/signatures")
            .then((response) => {
                alert("Signed petition");
            })
            .catch((error) => {
                alert("Failed to sign petition");
                this.error = error;
                this.errorFlag = true;
            });
        },

        unsignPetition: function() {
            this.$http.delete('http://localhost:4941/api/v1/petitions/' + this.petition.petitionId + "/signatures")
            .then((response) => {
                alert("Unsigned petition");
            })
            .catch((error) => {
                alert("Failed to unsign petition");
                this.error = error;
                this.errorFlag = true;
            });
        },

        getSignatures: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions/' + this.$route.params.petitionId + "/signatures")
            .then((response) => {
                this.signatures = response.data;
                this.isSignedByUser();
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