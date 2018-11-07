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
                // window.location.replace('../www/content.php');
            }else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#login-fielset').find('.error-message').remove();
                $('#login-fielset').prepend(message);
            }
        }
    );
});

let resetPassword = $('#submit-password');

resetPassword.on('click', function (event) {
    event.preventDefault();

    let resetPasswordFormInput = new FormData();
    resetPasswordFormInput.append('username', $('#username-change-password').val());
    resetPasswordFormInput.append('old', $('#old-password').val());
    resetPasswordFormInput.append('new', $('#new-password').val());
    resetPasswordFormInput.append('renew', $('#re-new-password').val());

    console.log('|' + resetPasswordFormInput.get('username') + '|')
    let loginPromise = httpPost('php/ajax/reset_password.php', resetPasswordFormInput, "POST");

    loginPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                if(data['affected_rows'] !== -1)
                    window.location.replace('../GESTIONALEMAGAZZINO/index.php');
                else{
                    let message = $('<div class="center-text error-message"><span>Impossibile cambiare la password</span></div>');
                    if ($('.error-message').length !== 0)
                        $('#login-fielset').find('.error-message').remove();
                    $('#login-fielset').prepend(message);
                }
            }else {
                let message = $('<div class="center-text error-message-repass"><span>' + data.message + '</span></div>');
                if ($('.error-message-repass').length !== 0)
                    $('#change-password-fielset').find('.error-message-repass').remove();
                $('#change-password-fielset').prepend(message);
            }
        }
    );
});