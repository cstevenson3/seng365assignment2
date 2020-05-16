<template>
    <div>
        <div style="height:auto;width:100%;display:block;background-color:#FF0000">
            <div style="background-color:#0000FF;float:left;width:auto;">
                <div style="float:left;" v-if="loggedIn">
                    <button 
                    type="button" 
                    class="btn btn-primary" 
                    v-on:click="fillCreatePetitionDetails();" 
                    data-toggle="modal" 
                    data-target="#createPetitionModal"> 
                        Create Petition
                    </button>
                </div>
            </div>

            <div style="float:right;background-color:#00FF00;width:auto;">
                <div style="float:left;" v-if="loggedIn">
                    <button 
                    type="button" 
                    class="btn btn-primary"
                    v-on:click="fillEditDetails();"
                    data-toggle="modal"
                    data-target="#editUserModal">
                        {{ currentUserName() }}
                    </button>
                </div>

                <div style="float:left;" v-if="loggedIn">
                    <button 
                    type="button" 
                    class="btn btn-primary" 
                    v-on:click="logout();">
                        Logout
                    </button>
                </div>

                <div style="float:left;" v-if="!loggedIn">
                    <button 
                    type="button" 
                    class="btn btn-primary" 
                    data-toggle="modal"
                    data-target="#loginUserModal">
                        Log in
                    </button>   
                </div>

                <div style="float:left;" v-if="!loggedIn">
                    <button 
                    type="button" 
                    class="btn btn-primary" 
                    data-toggle="modal"
                    data-target="#registerUserModal">
                        Register
                    </button> 
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>

        <div 
        class="modal fade" 
        id="createPetitionModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="createPetitionModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createPetitionModalLabel">Create Petition</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent v-on:submit="createPetition(); return false;">
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
                            <input type="submit" value="Create Petition"/>
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

        <div 
        class="modal fade" 
        id="loginUserModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="loginUserModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginUserModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent v-on:submit="loginUser(); return false;">
                            <input v-model="loginEmail" placeholder="email" />
                            <input v-model="loginPassword" placeholder="password" type="password" />
                            <input type="submit" value="Login"/>
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

        <div 
        class="modal fade" 
        id="registerUserModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="registerUserModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="registerUserModalLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent v-on:submit="registerUser(); return false;">
                            <input v-model="registerEmail" placeholder="email" />
                            <input v-model="registerPassword" placeholder="password" type="password" />
                            <input v-model="registerName" placeholder="name" />
                            <input v-model="registerCity" placeholder="city" />
                            <input v-model="registerCountry" placeholder="country" />
                            <input type="file" id="registerImageInput" ref="registerImage" v-on:change="handleUserRegisterImage()"/>
                            <div id="result"></div>
                            <input type="submit" value="Register"/>
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

        <div 
        class="modal fade" 
        id="editUserModal" 
        tabindex="-1" 
        role="dialog"
        aria-labelledby="editUserModalLabel" 
        aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editUserModalLabel">Edit Profile</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent v-on:submit="editUser(); return false;">
                            <input v-model="editEmail" placeholder="email" />
                            <input v-model="editPassword" placeholder="password" type="password" />
                            <input v-model="editName" placeholder="name" />
                            <input v-model="editCity" placeholder="city" />
                            <input v-model="editCountry" placeholder="country" />
                            <input type="file" id="editImageInput" ref="editImage" v-on:change="handleUserEditImage()"/>
                            <div id="result"></div>
                            <input type="submit" value="Save"/>
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

            loggedIn: false,
            currentUser: null,

            petitionTitle:"",
            petitionDescription:"",
            petitionCategory: "",
            petitionCategories: [],
            petitionClosingDate:"",

            loginEmail: "",
            loginPassword: "",

            registerEmail: "",
            registerPassword: "",
            registerName: "",
            registerCity: "",
            registerCountry: "",

            editEmail: "",
            editPassword: "",
            editName: "",
            editCity: "",
            editCountry: "",

            petitionImage: '',
            petitionImageData: null,
            petitionImageType: "",

            registerImage: '',
            registerImageData: null,
            registerImageType: "",

            editImage: '',
            editImageData: null,
            editImageType: ""
        }
    },

    mounted: function() {
        this.isLoggedIn();
    },

    methods: {
        isLoggedIn: function() {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.loggedIn = this.currentUser != null;
            this.$http.defaults.headers.common['X-Authorization'] = this.currentUser.authToken;
            return this.loggedIn;
        },

        currentUserName: function () {
            return (JSON.parse(localStorage.getItem('currentUser'))).name;
        },

        saveLoginData: function(id, token, name) {
            let currentUser = {userId: id, authToken: token, name: name};
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.isLoggedIn();
        },

        logout: function () {
            localStorage.setItem('currentUser', JSON.stringify(null));
            this.$http.defaults.headers.common['X-Authorization'] = undefined;
            this.isLoggedIn();
        },

        fillCreatePetitionDetails: function() {
            this.$http.get('http://localhost:4941/api/v1/petitions/categories')
            .then((categoriesResponse) => {
                this.petitionCategories = categoriesResponse.data;
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        createPetition: function() {
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
            console.log(data.categoryId);
            if(this.description != "") {
                data.description = this.petitionDescription;
            }
            let uploadImage = false;
            if(this.petitionImageData != null) {
                uploadImage = true;
            }

            this.$http.post('http://localhost:4941/api/v1/petitions', data)
            .then((petitionResponse) => {
                if(uploadImage) {
                    this.$http.put('http://localhost:4941/api/v1/petitions/' + petitionResponse.data.petitionId + '/photo', this.petitionImageData, {headers: {"Content-Type": this.petitionImageType}})                            
                    .then((imageResponse) => {
                        window.location.href = '/petitions/' + petitionResponse.data.petitionId;
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                        window.location.href = '/petitions/' + petitionResponse.data.petitionId;
                    });
                } else {
                    window.location.href = '/petitions/' + petitionResponse.data.petitionId;
                }
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        loginUser: function () {
            this.$http.post('http://localhost:4941/api/v1/users/login', {email: this.loginEmail, password: this.loginPassword})
            .then((loginResponse) => {
                this.$http.get('http://localhost:4941/api/v1/users/' + loginResponse.data.userId)
                .then((userResponse) => {
                    this.saveLoginData(loginResponse.data.userId, loginResponse.data.token, userResponse.data.name);
                    $('#loginUserModal').modal('toggle');
                })
                .catch((error) => {
                    this.error = error;
                    this.errorFlag = true;
                });
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        handleUserRegisterImage: function () {
            this.registerImage = this.$refs.registerImage.files[0];
            this.registerImageType = this.registerImage.type;
            let reader = new FileReader();
            let vueInstance = this;
            reader.onload = function() {
                let arrayBuffer = this.result;
                let array = new Uint8Array(arrayBuffer);
                vueInstance.registerImageData = array;
            }
            reader.readAsArrayBuffer(this.registerImage);
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

        handleUserEditImage: function () {
            this.editImage = this.$refs.editImage.files[0];
            this.editImageType = this.editImage.type;
            let reader = new FileReader();
            let vueInstance = this;
            reader.onload = function() {
                let arrayBuffer = this.result;
                let array = new Uint8Array(arrayBuffer);
                vueInstance.editImageData = array;
            }
            reader.readAsArrayBuffer(this.editImage);
        },

        registerUser: function () {
            let data = {};
            if(this.registerEmail == "") {
                alert("Email is required");
                return;
            }
            if(this.registerPassword == "") {
                alert("Password is required");
                return;
            }
            if(this.registerName == "") {
                alert("Name is required");
                return;
            }
            data.email = this.registerEmail;
            data.password = this.registerPassword;
            data.name = this.registerName;
            if(this.registerCity != "") {
                data.city = this.registerCity;
            }
            if(this.registerCountry != "") {
                data.country = this.registerCountry;
            }
            let uploadImage = false;
            if(this.registerImageData != null) {
                uploadImage = true;
            }

            this.$http.post('http://localhost:4941/api/v1/users/register', data)
            .then((registerResponse) => {
                this.$http.post('http://localhost:4941/api/v1/users/login', {email: data.email, password: data.password})
                .then((loginResponse) => {
                    this.$http.get('http://localhost:4941/api/v1/users/' + registerResponse.data.userId)
                    .then((userResponse) => {
                        this.saveLoginData(loginResponse.data.userId, loginResponse.data.token, userResponse.data.name);
                        if(uploadImage) {
                            this.$http.put('http://localhost:4941/api/v1/users/' + registerResponse.data.userId + '/photo', this.registerImageData, {headers: {"Content-Type": this.registerImageType}})                            
                            .then((imageResponse) => {
                                //image uploaded
                            })
                            .catch((error) => {
                                alert("Account has been registered, but failed to upload profile image");
                                console.log(error);
                                this.error = error;
                                this.errorFlag = true;
                            });
                        }
                        $('#registerUserModal').modal('toggle');
                    })
                    .catch((error) => {
                        this.error = error;
                        this.errorFlag = true;
                    });
                })
                .catch((error) => {
                    this.error = error;
                    this.errorFlag = true;
                });
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        fillEditDetails: function () {
            this.isLoggedIn();
            this.$http.get('http://localhost:4941/api/v1/users/' + this.currentUser.userId)
            .then((userResponse) => {
                this.editEmail = userResponse.data.email;
                this.editName = userResponse.data.name;
                this.editCity = userResponse.data.city ? userResponse.data.city : "";
                this.editCountry = userResponse.data.country ? userResponse.data.country : "";
            })
            .catch((error) => {
                this.error = error;
                this.errorFlag = true;
            });
        },

        editUser: function () {
            let data = {};
            if(this.editEmail == "") {
                alert("Email is required");
                return;
            }
            if(this.editName == "") {
                alert("Name is required");
                return;
            }
            data.email = this.editEmail;
            data.name = this.editName;

            if(this.editPassword != "") {
                data.password = this.editPassword;
            }
            if(this.editCity != "") {
                data.city = this.editCity;
            }
            if(this.editCountry != "") {
                data.country = this.editCountry;
            }
            let uploadImage = false;
            if(this.editImageData != null) {
                uploadImage = true;
            }

            this.$http.patch('http://localhost:4941/api/v1/users/' + this.currentUser.userId, data)
            .then((patchResponse) => {
                alert("Profile saved");
                if(uploadImage) {
                    this.$http.put('http://localhost:4941/api/v1/users/' + this.currentUser.userId + '/photo', this.editImageData, {headers: {"Content-Type": this.editImageType}})                            
                    .then((imageResponse) => {
                        alert("New image saved");
                    })
                    .catch((error) => {
                        alert("Failed to upload profile image");
                        this.error = error;
                        this.errorFlag = true;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.error = error;
                this.errorFlag = true;
            });
        }
    }
}
</script>