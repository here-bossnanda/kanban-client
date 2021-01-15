<template>
    <form @submit.prevent="register" class="sign-up-form">
        <h2 class="title">Sign Up</h2>
        <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input v-model="createUser.email" type="text" placeholder="Email">
        </div>

        <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="createUser.firstName" type="text" placeholder="First Name">
        </div>

        <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="createUser.lastName" type="text" placeholder="Last Name">
        </div>

        <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="createUser.password" type="password" placeholder="Password">
        </div>
        <input type="submit" value="Sign Up" class="btn-auth solid">

        <p class="social-text">Or Sign in with social platforms</p>
        <div class="social-media">
            <a href="#" class="social-icon"> <i class="fab fa-facebook-f"></i> </a>
            <a href="#" class="social-icon"> <i class="fab fa-twitter"></i> </a>
            <a href="#" class="social-icon" @click.prevent="onSignIn"> <i class="fab fa-google"></i> </a>
            <a href="#" class="social-icon"> <i class="fab fa-linkedin-in"></i> </a>
        </div>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RegisterForm',
    data() {
        return{
            createUser: {
                email: '',
                firstName: '',
                lastName: '',
                password: ''
            }
        }
    },
    props: ['baseUrl','changeClass','onSignIn'],
    methods:{
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
                    this.changeClass('removeClass','sign-up-mode')
                })
                .catch(({ response }) => {
                    response.data.message.map(el => {
                        return toastr.warning(el, 'Warning Alert!');
                    })
                })
        },
    }
}
</script>

<style>

</style>