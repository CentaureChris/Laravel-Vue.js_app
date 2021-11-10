require('./bootstrap');
window.Vue = require('vue');

import VueRouter from 'vue-router'; 
Vue.use(VueRouter);

import App from './App.vue';
import Home from '../js/components/Home.vue';
import ClientList from '../js/components/ClientList.vue';
import AddClient from '../js/components/AddClient.vue';
import LoginForm from '../js/components/LoginForm.vue';
import Register from '../js/components/Register.vue';



import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';

Vue.use(VueAxios,axios);

const routes = [
    {
        name:'/',
        path:'/',
        component: Home
    },{
        name:'/clients',
        path:'/clients',
        component: ClientList
    },{
        name:'/clients/addClient',
        path:'/clients/addClient',
        component: AddClient
    },{
        name:'/login',
        path:'/login',
        component: LoginForm
    },{
        name:'/register',
        path:'/register',
        component: Register
    }
]

const router = new VueRouter( {mode:'history',routes: routes});
const app = new Vue(Vue.util.extend({ router },App)).$mount('#app');
