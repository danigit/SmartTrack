/**
 * Funzione che recupera tutti i kit e li visualizza in una tabella
 */
function seeKitsHistory() {
    getKits();
    let allKitsHistoryPromise = httpPost('php/ajax/get_kits_history.php', '', 'GET');

    allKitsHistoryPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#all-kit-history-body').empty();
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
                            tableRow.append('<td class="font-x-large darkblue-color center-text bold-text">' + innerValue + '</td>');
                        }else {
                            tableRow.append('<td class="font-x-large center-text bold-text">' + innerValue + '</td>');
                        }
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

$('#see-kit-history-select').on('change', function () {

    let kitId = $('#see-kit-history-select').find(':selected').attr('id');

    if(kitId === undefined){
        seeKitsHistory()
    }else if (kitId === 'closed'){
        let closedKitHistoryPromise = httpPost('php/ajax/closed_kit_history.php', '', 'GET');

        closedKitHistoryPromise.then(
            function (data) {
                if (data.result) {
                    $('#all-kit-history-body').empty();
                    let tableRow;
                    let i = 0;
                    $.each(data[0], function (key, value) {
                        if ((i++ % 2) === 0) {
                            tableRow = $('<tr></tr>');
                        } else {
                            tableRow = $('<tr class="gray-background"></tr>')
                        }
                        //elaboro le righe della tabella e le visualizzo
                        $.each(value, function (innerKey, innerValue) {
                            if (innerKey === 'kit_id') {
                                tableRow.append('<td class="font-x-large darkblue-color center-text bold-text">' + innerValue + '</td>');
                            } else {
                                tableRow.append('<td class="font-x-large center-text bold-text">' + innerValue + '</td>');
                            }
                        });
                        $('#all-kit-history-body').append(tableRow).trigger('create');
                    });
                }
            }
        )
    }else if( kitId === 'incomplete'){
        let incompleteKitHistoryPromise = httpPost('php/ajax/incomplete_kit_history.php', '', 'GET');
        incompleteKitHistoryPromise.then(
            function (data) {
                if (data.result) {
                    $('#all-kit-history-body').empty();
                    let tableRow;
                    let i = 0;
                    $.each(data[0], function (key, value) {
                        if ((i++ % 2) === 0) {
                            tableRow = $('<tr></tr>');
                        } else {
                            tableRow = $('<tr class="gray-background"></tr>')
                        }
                        //elaboro le righe della tabella e le visualizzo
                        $.each(value, function (innerKey, innerValue) {
                            if (innerKey === 'kit_id') {
                                tableRow.append('<td class="font-x-large darkblue-color center-text bold-text">' + innerValue + '</td>');
                            } else {
                                tableRow.append('<td class="font-x-large center-text bold-text">' + innerValue + '</td>');
                            }
                        });
                        $('#all-kit-history-body').append(tableRow).trigger('create');
                    });
                }
            }
        )
    } else{

        let kitHistoryForm = new FormData();
        kitHistoryForm.append('id', kitId);

        let kitHistoryPromise = httpPost('php/ajax/get_history_by_kit.php', kitHistoryForm, 'POST');

        kitHistoryPromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    $('#all-kit-history-body').empty();
                    let tableRow;
                    let i = 0;
                    $.each(data[0], function (key, value) {
                        if ((i++ % 2) === 0) {
                            tableRow = $('<tr></tr>');
                        } else {
                            tableRow = $('<tr class="gray-background"></tr>')
                        }
                        //elaboro le righe della tabella e le visualizzo
                        $.each(value, function (innerKey, innerValue) {
                            if (innerKey === 'kit_id') {
                                tableRow.append('<td class="font-x-large darkblue-color center-text bold-text">' + innerValue + '</td>');
                            } else {
                                tableRow.append('<td class="font-x-large center-text bold-text">' + innerValue + '</td>');
                            }
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
});

function getKits() {
    let allKitsPromise = httpPost('php/ajax/get_all_kits.php');

    allKitsPromise.then(
        function (data) {
            if (data.result){
                console.log(data);
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['kit_id'] + '">' + value['description'] + '</option>';
                });
                $('#see-kit-history-select').append(select);
                $('#see-kit-history-select').trigger('create');
            }
        }
    )
}