const signUp = () => {
    console.log('btn sign up click');
    $('.container-auth').addClass("sign-up-mode");
}

const signIn = () => {
    console.log('btn sign in click');
    $('.container-auth').removeClass("sign-up-mode");
}

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