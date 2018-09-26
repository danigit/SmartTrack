
function createKit() {

    let typesSelect = $('#type-select');

    let creaKitPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    creaKitPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                $.each(data[0], function (key, value) {
                    select += '<option>' + value['type'] + '</option>';
                });
                typesSelect.append(select);
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#error-msg').find('.error-message').remove();
                $('#error-msg').append(message);
            }
        }
    );
}
