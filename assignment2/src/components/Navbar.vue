<template>
    <div>
        <div style="height:auto;width:100%;display:block;background-color:#FF0000">
            <div style="background-color:#0000FF;float:left;width:auto;">
            d
            </div>
            <div style="float:right;background-color:#00FF00;width:auto;">
                <div style="float:left;" v-if="isLoggedIn()">
                    Logged in as {{ currentUser() }}
                </div>

                <div style="float:left;" v-if="isLoggedIn()">
                    Logout
                </div>

                <div style="float:left;" v-if="!isLoggedIn()">
                    <button 
                    type="button" 
                    class="btn btn-primary" 
                    data-toggle="modal"
                    data-target="#loginUserModal">
                        Log in
                    </button>   
                </div>

                <div style="float:left;" v-if="!isLoggedIn()">
                    Register
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
                        <h5 class="modal-title" id="loginUserModalLabel">Login User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent v-on:submit="loginUser(); return false;">
                            <input v-model="email" placeholder="email" />
                            <input v-model="password" placeholder="password" />
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
    </div>
</template>

<script>
export default {
    data () {
        return {
                error: "",
                errorFlag: false
        }
    },

    mounted: function() {
    },

    methods: {
        isLoggedIn: function() {
            return JSON.parse(localStorage.getItem('currentUser')) != null;
        },

        currentUser: function () {
            console.log(localStorage.getItem('currentUser'));
            return (JSON.parse(localStorage.getItem('currentUser'))).name;
        },

        loginUser: function () {
            console.log("here1");
            console.log(this.email);
            this.$http.post('http://localhost:4941/api/v1/users/login', {email: this.email, password: this.password})
            .then((loginResponse) => {
                console.log("here2");
                this.$http.get('http://localhost:4941/api/v1/users/' + loginResponse.data.userId)
                .then((userResponse) => {
                    console.log("here3");
                    let currentUser = {name: userResponse.data.name, authToken: loginResponse.data.token};
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
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