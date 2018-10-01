/**
 * Funzione che recupera tutti i kit e li visualizza in una tabella
 */
function seeAllKits() {
    let allKitsPromise = httpPost('php/ajax/get_all_kits.php', '', 'GET');

    allKitsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
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
                        if(innerKey === 'kit_id' || innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow.append('<td class="font-x-large">' + innerValue + '</td>');
                        }
                        //segnalo i kit chiusi o aperti
                        else if(innerKey === 'closing_date'){
                            if(innerValue !== "") {
                                tableRow.append('<td class="font-x-large">Si</td>');
                            }else{
                                tableRow.append('<td class="font-x-large">No</td>');
                            }
                        }
                    });
                    $('#all-kit-body').append(tableRow).trigger('create');
                });
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#all-kit-error-message').find('.error-message').remove();
                $('#all-kit-error-message').append(message);
            }
        }
    );
}