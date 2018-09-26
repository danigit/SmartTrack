/**
 * Funzione che esegue il login dell'utente
 */
let submitLogin = $('#submit-login');
let loginForm = $('#login-form');
submitLogin.on('click', function (event) {
    console.log('preventing default');
    event.preventDefault();

    let logingFormInput = new FormData();
    logingFormInput.append('email', $('#email').val());
    logingFormInput.append('password', $('#password').val());

    let loginPromise = httpPost('php/ajax/login.php', logingFormInput, "POST");

    loginPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //l'utente e' logato quindi entro nell'area protetta
                window.location.replace('../www/content.php');
            }else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#login-fielset').find('.error-message').remove();
                $('#login-fielset').prepend(message);
            }
        }
    );
});