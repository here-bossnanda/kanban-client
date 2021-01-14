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
      :detailOrganisation="detailOrganisation">
    </organisation-page>

    <task-page v-else-if="page === 'task'"
        :baseUrl="baseUrl"
        :backlogs="backlogs"
        :todos="todos"
        :doings="doings"
        :dones="dones"
        :taskDetailTitle="taskDetailTitle"
        :taskDetailOwner="taskDetailOwner"
        :detailOrganisation="detailOrganisation"
        :detailIdOrganisation="detailIdOrganisation">
    </task-page> 

            

  </div>
</template>

<script>
  import axios from 'axios';

  import AuthPage from "./components/Auth/AuthPage";
  import HomePage from "./components/Home/HomePage";
  import Navbar from "./components/Layouts/Navbar";
  import OrganisationPage from './components/Organisation/OrganisationPage';
  import TaskPage from './components/Task/TaskPage';


  
  export default {
    name: "App",
    data() {
      return {
        message: 'hello world',
        page: 'login',
        baseUrl: 'http://localhost:3000',
        welcomeName: '',
        organisationsData: [],
        detailOrganisationsData : [],
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
      detailOrganisation(id) {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/organisations/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.changePage('task');
                this.detailOrganisationsData = data.data;
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
    },
    computed: {
        backlogs() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "backlog");
        },
        todos() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "todo");
        },
        doings() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "doing");
        },
        dones() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "done");
        }
    }
  };
</script>
