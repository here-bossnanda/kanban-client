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
      :organisationsData="organisationsData"
      :fetchOrganisation="fetchOrganisation"
      :baseUrl="baseUrl"
      :changePage="changePage"
      :page="page"
      :detailOrganisationsData="detailOrganisationsData"
      :detailOrganisation="detailOrganisation"
      :memberOrganisation="memberOrganisation">
    </organisation-page>

    <task-page v-else-if="page === 'task'"
        :baseUrl="baseUrl"
        :taskDetailTitle="taskDetailTitle"
        :taskDetailOwner="taskDetailOwner"
        :detailOrganisation="detailOrganisation"
        :detailOrganisationsData="detailOrganisationsData"
        :detailIdOrganisation="detailIdOrganisation">
    </task-page> 


    <member-page v-else-if="page === 'member'"
        :baseUrl="baseUrl"
        :taskDetailTitle="taskDetailTitle"
        :taskDetailOwner="taskDetailOwner"
        :detailMember="detailMember"
        :detailIdOrganisation="detailIdOrganisation"
        :memberOrganisation="memberOrganisation"
        :members="members">
    </member-page> 

  </div>
</template>

<script>
  import axios from 'axios';

  import AuthPage from "./components/Auth/AuthPage";
  import HomePage from "./components/Home/HomePage";
  import Navbar from "./components/Layouts/Navbar";
  import OrganisationPage from './components/Organisation/OrganisationPage';
  import TaskPage from './components/Task/TaskPage';
  import MemberPage from './components/Member/MemberPage';


  
  export default {
    name: "App",
    data() {
      return {
        message: 'hello world',
        page: 'login',
        baseUrl: 'https://kanban-hactiv8.herokuapp.com',
        welcomeName: '',
        organisationsData: [],
        detailOrganisationsData : [],
        detailMember : [],
        members: [],
        detailIdOrganisation : 0,
        taskDetailTitle: '',
        taskDetailOwner: ''
      };
    },
    components: {
      AuthPage,
      HomePage,
      OrganisationPage,
      TaskPage,
      MemberPage,
      Navbar,
    },
    methods: {
      checkAuth() {
            if (localStorage.access_token) {
                this.changePage('home');
                this.fetchOrganisation();
                this.fetchMember();
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
            this.$gAuth.signOut()
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
      fetchMember() {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/users`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.members = data.data
            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
      },
      detailOrganisation(id) {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/organisations/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.detailOrganisationsData = data.data.category;
                this.detailIdOrganisation = data.data.organisation.id
                this.taskDetailTitle = `${data.data.organisation.name} organisation`
                this.taskDetailOwner = `owner: ${data.data.organisation.owner.firstName} ${data.data.organisation.owner.lastName}`
                this.changePage('task');
            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
        },
        memberOrganisation(id) {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/organisations/${id}/users`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.changePage('member');
                this.detailMember = data.data.user;
                this.detailIdOrganisation = data.data.id
                this.taskDetailTitle = `${data.data.name} organisation`
                this.taskDetailOwner = `owner: ${data.data.owner.firstName} ${data.data.owner.lastName}`
            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
        },
    },
    created() {
        this.checkAuth()
    }
  };
</script>
