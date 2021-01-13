const app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        page: 'login',
        baseUrl: 'http://localhost:3000',
        organisationsData: [],
        user: {
            email: '',
            password: ''
        },
        createUser: {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        }
    },
    methods: {
        checkAuth() {
            if (localStorage.access_token) {
                this.fetchOrganisation()
                this.changePage('home');
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
                console.log(data);
                this.organisationsData = data.data
                console.log(data);
            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
        },
        detailOrganisation(id) {
            console.log(id);
        },
        deleteOrganisation(id) {
            axios({
                method: 'DELETE',
                url: `${this.baseUrl}/organisations/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.changePage('organisation');
                this.fetchOrganisation();
                toastr.sucess(message, 'Success Alert!');
            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
        }

    },
    created() {
        this.checkAuth()
    }
});