<template>
    <form @submit.prevent="login" class="sign-in-form">
        <h2 class="title">Sign in</h2>
        <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input v-model="user.email" type="text" placeholder="Email">
        </div>
        <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="user.password" type="password" placeholder="Password">
        </div>
        <input type="submit" value="Sign in" class="btn-auth solid">

        <p class="social-text">Or Sign in with social platforms</p>
        <div class="social-media">
            <a href="#" class="social-icon"> <i class="fab fa-facebook-f"></i> </a>
            <a href="#" class="social-icon"> <i class="fab fa-twitter"></i> </a>
            <a href="#" class="social-icon"> <i class="fab fa-google"></i> </a>
            <a href="#" class="social-icon"> <i class="fab fa-linkedin-in"></i> </a>
        </div>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    data() {
        return{
            user: {
                email: '',
                password: ''
            }
        }
    },
    props: ['baseUrl','checkAuth'],
    methods: {
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
        }
    }
    
}
</script>