<template>
    <div class="panels-container">
        <div class="panel left-panel">
            <div class="content">
                <h3>New Here ? </h3>
                <p> don't have account, create new account. </p>
                <button class="btn-auth transparent" @click="changeClass('addClass','sign-up-mode')">Sign Up</button>
            </div>

            <img src="../../assets/images/login.svg" alt="" class="image">
        </div>

        <div class="panel right-panel">
            <div class="content">
                <h3>One of us ? </h3>
                <p> Already have accont. </p>
                <button class="btn-auth transparent" @click="changeClass('removeClass','sign-up-mode')">Sign In</button>
            </div>

            <img src="../../assets/images/register.svg" class="image">
    </div>
</div>
</template>

<script>
export default {
    name: "PanelSide",
    props: ['changeClass']
}
</script>