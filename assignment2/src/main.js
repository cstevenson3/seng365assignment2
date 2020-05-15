import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import Home from './Home.vue';
import Petitions from './Petitions.vue';
import Petition from './Petition.vue';

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        name: "petitions",
        path: "/petitions",
        component: Petitions
    },
    {
        name: "petition",
        path: "/petitions/:petitionId",
        component: Petition
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
