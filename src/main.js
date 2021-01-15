import Vue from 'vue';
import App from './App.vue';

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

import 'vue-select/dist/vue-select.css';

import GAuth from 'vue-google-oauth2'
const gauthOption = {
    clientId: '383147864858-20v33ah0ohuqrd2eon1n4aimvvscmtmb.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}


Vue.use(GAuth, gauthOption)


new Vue({
    render: h => h(App),
}).$mount('#app');