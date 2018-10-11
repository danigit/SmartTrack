/**
 * Funzione che recupera tutti i kit e li visualizza in una tabella
 */
function seeKitsHistory() {
    console.log('history');
    let allKitsPromise = httpPost('php/ajax/get_kits_history.php', '', 'GET');

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
                        tableRow.append('<td class="font-x-large">' + innerValue + '</td>');
                    });
                    $('#all-kit-history-body').append(tableRow).trigger('create');
                });
            } else {
                let allKitHistoryErrorMessage = $('#all-kit-history-error-message');
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');

                if ($('.error-message').length !== 0)
                    allKitHistoryErrorMessage.find('.error-message').remove();
                allKitHistoryErrorMessage.append(message);
            }
        }
    );
}