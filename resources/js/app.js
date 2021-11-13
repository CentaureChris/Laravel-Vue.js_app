require('./bootstrap');
window.Vue = require('vue');

import VueRouter from 'vue-router'; 
Vue.use(VueRouter);
import store from './components/store/index'; 

import App from './App.vue';
import Home from '../js/components/Home.vue';
import ClientList from '../js/components/ClientList.vue';
import AddClient from '../js/components/AddClient.vue';
import LoginForm from '../js/components/LoginForm.vue';
import Register from '../js/components/Register.vue';
import UserView from '../js/components/UsersList.vue';




import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';

Vue.use(VueAxios,axios);

const routes = [
    {
        name:'HomeView',
        path:'/',
        component: Home
    },{
        name:'ClientsView',
        path:'/clients',
        component: ClientList
    },{
        name:'AddClientView',
        path:'/clients/addClient',
        component: AddClient
    },{
        name:'LoginView',
        path:'/login',
        component: LoginForm
    },{
        name:'RegisterView',
        path:'/register',
        component: Register
    },{
        name:'UsersView',
        path:'/user',
        component: UserView
    },
]

const router = new VueRouter( {mode:'history',routes: routes});
const app = new Vue(Vue.util.extend({ router,store },App)).$mount('#app');
