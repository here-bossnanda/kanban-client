<template>
  <div>
    <navbar
      v-show="page !== 'login'"
      :changePage="changePage" 
      :logout="logout">
    </navbar>

    <auth-page 
      v-if="page === 'login'" 
      :baseUrl="baseUrl" 
      :changePage="changePage"
      :checkAuth="checkAuth">
    </auth-page>

    
    <home-page 
    v-else-if="page === 'home'"
    :welcomeName="welcomeName"> 
    </home-page>

    <organisation-page 
    v-else-if="page === 'organisation'" 
    :organisationsData="organisationsData">

    </organisation-page>

  </div>
</template>

<script>
  import axios from 'axios';
  import AuthPage from "./components/Auth/AuthPage";
  import HomePage from "./components/Home/HomePage";
  import Navbar from "./components/Layouts/Navbar";
  import OrganisationPage from './components/Organisation/OrganisationPage';

  
  export default {
    name: "App",
    data() {
      return {
        message: 'hello world',
        page: 'login',
        baseUrl: 'http://localhost:3000',
        welcomeName: '',
        organisationsData: []
      };
    },
    components: {
      AuthPage,
      HomePage,
      OrganisationPage,
      Navbar,
    },
    methods: {
      checkAuth() {
            if (localStorage.access_token) {
                this.changePage('home');
                this.fetchOrganisation();
                this.welcomeName = `Welcome </br> ${localStorage.fullname}`
            } else {
                this.changePage('login');
            }
      },
      changePage(value) {
            this.page = value;
      },
      logout() {
            localStorage.clear();
            this.checkAuth();
      },
      fetchOrganisation() {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/organisations`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.organisationsData = data.data
            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
      },
    },
    created() {
        this.checkAuth()
    },
  };
</script>
