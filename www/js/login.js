/**
 * Funzione che esegue il login dell'utente
 */
let submitLogin = $('#submit-login');

submitLogin.on('click', function (event) {
    event.preventDefault();

    let logingFormInput = new FormData();
    logingFormInput.append('username', $('#username').val());
    logingFormInput.append('password', $('#password').val());

    let loginPromise = httpPost('php/ajax/login.php', logingFormInput, "POST");

    loginPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //l'utente e' logato quindi entro nell'area protetta
                window.location.replace('../GESTIONALEMAGAZZINO/content.php');
            }else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#login-fielset').find('.error-message').remove();
                $('#login-fielset').prepend(message);
            }
        }
    );
});