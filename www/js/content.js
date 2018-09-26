/**
 * Recupero e visualizzo i kit aperti
 */

function populateOpenKits() {
    let openKitsPromise = httpPost('php/ajax/get_open_kits.php', '', 'GET');

    openKitsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let tableRow;
                $.each(data[0], function (key, value) {
                    tableRow += '<tr>';
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'kit_id' || innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow += '<td class="font-x-large">' + innerValue + '</td>';
                        }else if(innerKey === 'spedisci'){
                            tableRow += '<td><a href="#" class="ui-btn font-small" data-name="' + innerValue + '">Spedisci kit</a>'
                        }else if(innerKey === 'chiudi'){
                            tableRow += '<td><a href="#" class="ui-btn font-small" data-name="' + innerValue + '">Chiudi kit</a>'
                        }
                    });
                    tableRow += '</tr>';
                });
                $('#open-kit-body').append(tableRow).trigger('create');
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#error-msg').find('.error-message').remove();
                $('#error-msg').append(message);
            }
        }
    );
}