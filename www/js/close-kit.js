/**
 * Funzione che chiude il kit passato come parametro
 * @param id - l'id del kit da chiudere
 * @param elem - la riga corrispondente al kit chiuso
 */

function closeKit(id, elem) {
    let closeKitForm = new FormData();
    closeKitForm.append('id', id);

    let closeKitPromise = httpPost('php/ajax/close_kit.php', closeKitForm, 'POST');

    closeKitPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //TODO mostrare il messaggio che il kit e' stato chiuso

                //rimuovo il kit chiuso
                $(elem).remove();
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#error-msg').find('.error-message').remove();
                $('#error-msg').append(message);

                //mostro il messaggio per 3 sec
                setTimeout(function () {
                    $('#error-msg').find('.error-message').remove();
                }, 3000);
            }
        }
    );
}