<template>
    <div id="navbar" >
        <div class="container">
            <div class="navbar-left">
                <img class="logo" src="../../assets/images/logo.png">
            </div>

            <span class="fa fa-bars menu-icon" style="display: none;"></span>
            <div class="navbar-right">
                <a href="javascript:void(0)" @click="changePage('home')"><i class="fa fa-home"></i> Home</a>
                <a href="javascript:void(0)" @click="changePage('organisation')"><i class="fa fa-school"> </i> Organisation</a>
                <a href="javascript:void(0)" @click="logout"><i class="fa fa-sign-out-alt"></i> Logout</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    props: ['logout','changePage']
}
</script>