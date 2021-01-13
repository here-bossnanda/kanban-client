const sign_up_btn = $('#sign-up-btn');

$('#sign-up-btn').on('click', () => {
    console.log('btn sign up click');
    $('.container-auth').addClass("sign-up-mode");
})

$('#sign-in-btn').on('click', () => {
    console.log('btn sign in click');
    $('.container-auth').removeClass("sign-up-mode");
})