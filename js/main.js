const app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        page: 'login',
        baseUrl: 'http://localhost:3000',
        welcomeName: '',
        organisationsData: [],
        detailOrganisationsData: [],
        showModalOrganisation: false,
        user: {
            email: '',
            password: ''
        },
        createUser: {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        },
        createOrganisation: {
            id: '',
            name: ''
        },
        taskDetailTitle: '',
        taskDetailOwner: ''
    },
    methods: {
        checkAuth() {
            if (localStorage.access_token) {
                this.fetchOrganisation()
                this.changePage('home');
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
            this.organisationsData = []
            this.checkAuth();
        },
        login() {
            axios({
                    method: 'post',
                    url: `${this.baseUrl}/login`,
                    data: {
                        email: this.user.email,
                        password: this.user.password,
                    }
                }).then(({ data }) => {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('fullname', data.fullname);
                    this.user.email = '';
                    this.user.password = '';
                    this.checkAuth();
                })
                .catch(({ response }) => {
                    this.user.email = '';
                    this.user.password = '';
                    toastr.error(response.data.message, 'Error Alert!');
                })
        },
        register() {
            axios({
                    method: 'POST',
                    url: `${this.baseUrl}/register`,
                    data: {
                        email: this.createUser.email,
                        firstName: this.createUser.firstName,
                        lastName: this.createUser.lastName,
                        password: this.createUser.password,
                    }
                }).then(({ data }) => {
                    this.createUser.email = '';
                    this.createUser.firstName = '';
                    this.createUser.lastName = '';
                    this.createUser.password = '';
                    toastr.success('successfully register new user, please login', 'Success Alert!');
                    $('.container-auth').removeClass("sign-up-mode");
                })
                .catch(({ response }) => {
                    response.data.message.map(el => {
                        return toastr.warning(el, 'Warning Alert!');
                    })
                })
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
                this.taskDetailTitle = `${data.data.name} organisation`
                this.taskDetailOwner = `owner: ${data.data.owner.firstName} ${data.data.owner.lastName}`

            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
        },
        saveOrupdateOrganisation(id) {
            let method, url;
            if (!id) {
                method = 'POST'
                url = `${this.baseUrl}/organisations`
            } else {
                method = 'PUT'
                url = `${this.baseUrl}/organisations/${id}`
            }

            axios({
                method: method,
                url: url,
                data: {
                    name: this.createOrganisation.name
                },
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.changePage('organisation');
                this.fetchOrganisation();
                this.showModalOrganisation = false;
                this.createOrganisation.name = ''
                this.createOrganisation.id = ''
                if (method === 'POST') {
                    toastr.success('successfully add new organisation', 'Success Alert');
                } else {
                    toastr.success('updated organisation successfully', 'Success Alert');
                }
            }).catch(({ response }) => {
                if (response.data.length > 0) {
                    response.data.message.map(el => {
                        return toastr.warning(el, 'Warning Alert!');
                    })
                } else {
                    toastr.error(response.data.message, 'Error Alert!');
                    this.showModalOrganisation = false;
                    this.createOrganisation.name = ''
                    this.createOrganisation.id = ''
                }
            })
        },
        editOrganisation(id) {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/organisations/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.createOrganisation.id = data.data.id
                this.createOrganisation.name = data.data.name
                this.showModalOrganisation = true;
            }).catch(({ response }) => {
                toastr.warning(response.data.message, 'Warning Alert!');
            })
        },
        deleteOrganisation(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: 'DELETE',
                        url: `${this.baseUrl}/organisations/${id}`,
                        headers: {
                            access_token: localStorage.access_token
                        }
                    }).then(({ data }) => {
                        this.changePage('organisation');
                        this.fetchOrganisation();
                        toastr.success(data.message, 'Success Alert!');
                    }).catch(({ response }) => {
                        toastr.error(response.data.message, 'Error Alert!');
                    })
                }
            })
        }

    },
    created() {
        this.checkAuth()
    },
    computed: {
        backlog() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "backlog");
        },
        todo() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "todo");
        },
        doing() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "doing");
        },
        done() {
            return this.detailOrganisationsData.task.filter(el => el.category.name === "done");
        }
    }
});