<template>
    <div class="container-auth">
        <div class="forms-container">
            <div class="signin-signup">
                <register-form 
                    :changeClass="changeClass" 
                    :baseUrl="baseUrl"
                    :onSignIn="onSignIn">
                </register-form>

                <login-form 
                    :checkAuth="checkAuth" 
                    :baseUrl="baseUrl"
                    :onSignIn="onSignIn">
                </login-form>
            </div>
        </div>

        <panel-side :changeClass="changeClass"> </panel-side>
    </div>
</template>

<script>
import axios from 'axios';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PanelSide from './PanelSide';

export default {
    name: "Auth",
    props: ['changePage','baseUrl','checkAuth'],
    
    components: {
        LoginForm,
        RegisterForm,
        PanelSide
    },
    methods: {
        changeClass(addRemoveClass, className) {
            const el = document.querySelector('.container-auth');

            if (addRemoveClass === 'addClass') {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        },
        onSignIn (user) {
            this.$gAuth
            .signIn()
            .then(googleUser => {
                const id_token = googleUser.getAuthResponse().id_token;
                return id_token
            })
            .then(id_token =>{
                return axios({
                    method: 'post',
                    url: `${this.baseUrl}/loginGoogle`,
                    data: {
                        id_token
                    }
                });
            }).then(data => {
                localStorage.setItem('access_token', data.data.access_token)
                localStorage.setItem('fullname', data.data.fullname)
                this.checkAuth();
                Swal.fire(
                        'Login successfully!',
                        `Welcome to kanban app ${localStorage.fullname}`,
                        'success'
                )
            })
            .catch(err => {
            toastr.error(response.data.message, 'Error Alert!');
            })
        }
    }
}
</script>