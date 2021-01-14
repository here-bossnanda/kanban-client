<template>
    <div class="container-auth">
        <div class="forms-container">
            <div class="signin-signup">
                <register-form 
                    :changeClass="changeClass" 
                    :baseUrl="baseUrl">
                </register-form>

                <login-form 
                    :checkAuth="checkAuth" 
                    :baseUrl="baseUrl">
                </login-form>
            </div>
        </div>

        <panel-side :changeClass="changeClass"> </panel-side>
    </div>
</template>

<script>
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
        }
    }
}
</script>