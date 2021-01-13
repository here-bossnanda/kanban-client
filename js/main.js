const app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        page: 'login',
        baseUrl: 'http://localhost:3000',
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
                }).then(data => {
                    localStorage.setItem('access_token', data.data.access_token);
                    this.user.email = '';
                    this.user.password = '';
                    this.changePage('home');
                })
                .catch(err => {
                    this.user.email = '';
                    this.user.password = '';
                    toastr.error(err.response.data.message, 'Error Alert!');
                })
        },
        register() {
            axios({
                    method: 'post',
                    url: `${this.baseUrl}/register`,
                    data: {
                        email: this.createUser.email,
                        firstName: this.createUser.firstName,
                        lastName: this.createUser.lastName,
                        password: this.createUser.password,
                    }
                }).then(data => {
                    this.createUser.email = '';
                    this.createUser.firstName = '';
                    this.createUser.lastName = '';
                    this.createUser.password = '';
                    toastr.success('successfully register new user, please login', 'Success Alert!');
                    $('.container-auth').removeClass("sign-up-mode");
                })
                .catch(err => {
                    this.createUser.email = '';
                    this.createUser.firstName = '';
                    this.createUser.lastName = '';
                    this.createUser.password = '';

                    err.response.data.message.map(el => {
                        return toastr.warning(el, 'Warning Alert!');
                    })
                })
        }
    },
    created() {
        this.checkAuth()
    }
});

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}