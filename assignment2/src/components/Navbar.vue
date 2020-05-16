<template>
    <div>
        <div style="height:auto;width:100%;display:block;background-color:#FF0000">
            <div style="background-color:#0000FF;float:left;width:auto;">
            d
            </div>
            <div style="float:right;background-color:#00FF00;width:auto;">
                <div style="float:left;" v-if="loggedIn">
                    Logged in as {{ currentUser() }}
                </div>

                <div style="float:left;" v-if="loggedIn">
                    Logout
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
    </div>
</template>

<script>
export default {
    data () {
        return {
            error: "",
            errorFlag: false,
            loggedIn: false,
            registerImage: '',
            registerImageData: null
        }
    },

    mounted: function() {
        this.isLoggedIn();
    },

    methods: {
        isLoggedIn: function() {
            this.loggedIn = JSON.parse(localStorage.getItem('currentUser')) != null;
            return this.loggedIn;
        },

        currentUser: function () {
            return (JSON.parse(localStorage.getItem('currentUser'))).name;
        },

        saveLoginData: function(name, token) {
            console.log("h");
            let currentUser = {name: name, authToken: token};
            console.log(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.$http.defaults.headers.common['Authorization'] = token;
            this.isLoggedIn();
        },

        loginUser: function () {
            this.$http.post('http://localhost:4941/api/v1/users/login', {email: this.loginEmail, password: this.loginPassword})
            .then((loginResponse) => {
                this.$http.get('http://localhost:4941/api/v1/users/' + loginResponse.data.userId)
                .then((userResponse) => {
                    this.saveLoginData(userResponse.data.name, loginResponse.data.token);
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
            console.log(this);
            this.registerImage = this.$refs.registerImage.files[0];
            let reader = new FileReader();
            let vueInstance = this;
            reader.onload = function() {
                console.log(vueInstance);
                let arrayBuffer = this.result;
                let array = new Uint8Array(arrayBuffer);
                let binaryString = String.fromCharCode.apply(null, array);
                vueInstance.registerImageData = binaryString;
            }
            reader.readAsArrayBuffer(this.registerImage);
        },

        registerUser: function () {
            console.log(this);
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
            console.log(this.registerImageData);
            if(this.registerImageData != null) {
                console.log("here");
                uploadImage = true;
            }

            this.$http.post('http://localhost:4941/api/v1/users/register', data)
            .then((registerResponse) => {
                console.log("login part");
                this.$http.post('http://localhost:4941/api/v1/users/login', {email: data.email, password: data.password})
                .then((loginResponse) => {
                    console.log("user part");
                    this.$http.get('http://localhost:4941/api/v1/users/' + registerResponse.data.userId)
                    .then((userResponse) => {
                        console.log("image part");
                        console.log("front");
                        this.saveLoginData(userResponse.data.name, loginResponse.data.token);
                        console.log("back");
                        console.log(uploadImage);
                        if(uploadImage) {
                            console.log("image if");
                            this.$http.put({
                                                method: 'put',
                                                url: 'http://localhost:4941/api/v1/users/' + registerResponse.data.userId + "/photo",
                                                data: this.registerImageData
                                            }
                            )
                            .then((imageResponse) => {
                                console.log("Image uploaded");
                            })
                            .catch((error) => {
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
        }
    }
}
</script>