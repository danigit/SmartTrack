/**
 * Funzione
 */
function getObjectsOutsideStorePosition() {

    let allTagsPromise = httpPost('php/ajax/objects_outside_store_position.php', '', 'GET');

    allTagsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                console.log(data);
                $('#objects-outside-store-body').empty();
                let tableRow;
                let i = 0;
                $.each(data[0], function (key, value) {
                    if((i++ % 2) === 0) {
                        tableRow = $('<tr></tr>');
                    }else{
                        tableRow = $('<tr class="gray-background"></tr>')
                    }
                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        tableRow.append('<td class="font-x-large center-text width-50">' + innerValue + '</td>');
                    });

                    $('#objects-outside-store-body').append(tableRow).trigger('create');
                });

                showEmptyTable($('#objects-outside-store-body'), 'Nessuna associazione da mostrare');
            } else {
                let allKitErrorMessage = $('#all-kit-error-message');

                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    allKitErrorMessage.find('.error-message').remove();
                allKitErrorMessage.append(message);
            }
        }
    );
};

