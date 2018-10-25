/**
 * Funzione
 */
function tagStatus() {

    let allTagsPromise = httpPost('php/ajax/get_tag_status.php', '', 'GET');

    allTagsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#tag-status-body').empty();
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
                        if(innerKey === 'id'){
                        }else if (innerKey === 'battery' && innerValue === "0") {
                            tableRow.append('<img src="../www/img/full-battery.png" class="margin-auto">');
                        }else if( innerKey === 'battery' && innerValue === "1") {
                            tableRow.append('<img src="../www/img/low-battery.png" class="margin-auto">');
                        }else{
                                tableRow.append('<td class="font-x-large bold-text center-text">' + innerValue + '</td>');
                        }
                    });
                    $('#tag-status-body').append(tableRow).trigger('create');
                });
                showEmptyTable($('#tag-status-body'), 'Nessun tag da mostrare');
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

