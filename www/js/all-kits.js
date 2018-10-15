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
                        if(innerKey === 'kit_id'){
                            tableRow.append('<td class="font-x-large darkblue-color bold-text center-text">' + innerValue + '</td>');
                        }else if(innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow.append('<td class="font-x-large bold-text center-text">' + innerValue + '</td>');
                        }
                        //segnalo i kit chiusi o aperti
                        else if(innerKey === 'closing_date'){
                            if(innerValue !== "") {
                                tableRow.append('<td class="font-x-large bold-text center-text">Si</td>');
                            }else{
                                tableRow.append('<td class="font-x-large bold-text center-text">No</td>');
                            }
                        }
                    });
                    $('#all-kit-body').append(tableRow).trigger('create');
                });
            } else {
                let allKitErrorMessage = $('#all-kit-error-message');

                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    allKitErrorMessage.find('.error-message').remove();
                allKitErrorMessage.append(message);
            }
        }
    );
}

function seeIncompleteKits() {
    let allKitsPromise = httpPost('php/ajax/get_incomplete_kits.php', '', 'GET');

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
                        if (innerKey === 'kit_id' || innerKey === 'cod'){
                            tableRow.append('<td class="font-x-large darkblue-color center-text bold-text">' + innerValue + '</td>');
                        }else {
                            tableRow.append('<td class="font-x-large center-text bold-text">' + innerValue + '</td>');
                        }
                    });

                    $('#all-incomplete-kits-body').append(tableRow).trigger('create');
                });
            } else {
                let allIncompleteKitsErrorMessage = $('#all-incomplete-kits-error-message');

                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    allIncompleteKitsErrorMessage.find('.error-message').remove();
                allIncompleteKitsErrorMessage.append(message);
            }
        }
    );
}