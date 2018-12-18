/**
 * Funzione che recupera tutti i kit e li visualizza in una tabella
 */
function seeKitsHistory(first) {
    if (first)
        getKits($('#see-kit-history-select'));

    //invio richiesta xmlhttp
    let allKitsHistoryPromise = httpPost('php/ajax/get_kits_history.php', '', 'GET');

    //interpreto risposta
    allKitsHistoryPromise.then(
        function (data) {
            let allKitHistoryBody = $('#all-kit-history-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                allKitHistoryBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    tableRow = setTableRowColor(i++);

                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'kit_id'){
                            tableRow.append('<td class="font-x-large darkblue-color center-text">' + innerValue + '</td>');
                        }else {
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                    });
                    allKitHistoryBody.append(tableRow).trigger('create');
                });

                showEmptyTable(allKitHistoryBody, language['no-kit-to-show']);
            } else {
                showEmptyTable(allKitHistoryBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}

//gestisco il click sul pulsante di visualizzazione della cronologia del kit
$('#see-kit-history-select').on('change', function () {

    let kitId = $('#see-kit-history-select').find(':selected').attr('id');

    if(kitId === 'all'){
        seeKitsHistory(false)
    }else if (kitId === 'closed'){
        //invio richiesta xmlhttp
        let closedKitHistoryPromise = httpPost('php/ajax/closed_kit_history.php', '', 'GET');

        //interpreto risposta
        closedKitHistoryPromise.then(
            function (data) {
                let allKitHistoryBody = $('#all-kit-history-body');
                //controllo se ci sono stati degli errori nella risposta
                if (data.result) {
                    allKitHistoryBody.empty();
                    let tableRow, i = 0;
                    $.each(data[0], function (key, value) {
                        tableRow = setTableRowColor(i++);
                        //elaboro le righe della tabella e le visualizzo
                        $.each(value, function (innerKey, innerValue) {
                            if (innerKey === 'kit_id') {
                                tableRow.append('<td class="font-x-large darkblue-color center-text">' + innerValue + '</td>');
                            } else {
                                tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                            }
                        });
                        allKitHistoryBody.append(tableRow).trigger('create');
                    });
                    showEmptyTable(allKitHistoryBody, language['no-kit-to-show']);
                }else {
                    showEmptyTable(allKitHistoryBody, language['no-server-response'] + ". <br> Error: " + data.message);
                }
            }
        )
    }else if( kitId === 'incomplete'){
        //invio richiesta xmlhttp
        let incompleteKitHistoryPromise = httpPost('php/ajax/incomplete_kit_history.php', '', 'GET');

        //interpreto risposta
        incompleteKitHistoryPromise.then(
            function (data) {
                let allKitsHistoryBody = $('#all-kit-history-body');
                //controllo se ci sono stati degli errori nella risposta
                if (data.result) {
                    allKitsHistoryBody.empty();
                    let tableRow, i = 0;
                    $.each(data[0], function (key, value) {
                        tableRow = setTableRowColor(i++);
                        //elaboro le righe della tabella e le visualizzo
                        $.each(value, function (innerKey, innerValue) {
                            if (innerKey === 'kit_id') {
                                tableRow.append('<td class="font-x-large darkblue-color center-text">' + innerValue + '</td>');
                            } else {
                                tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                            }
                        });
                        allKitsHistoryBody.append(tableRow).trigger('create');
                    });

                    showEmptyTable(allKitsHistoryBody, language['no-kit-to-show']);
                }else {
                    showEmptyTable(allKitHistoryBody, language['no-server-response'] + ". <br> Error: " + data.message);
                }
            }
        )
    }else{
        //recupero dati da inviare
        let kitHistoryForm = new FormData();
        kitHistoryForm.append('id', kitId);

        //invio richiesta xmlhttp
        let kitHistoryPromise = httpPost('php/ajax/get_history_by_kit.php', kitHistoryForm, 'POST');

        //interpreto risposta
        kitHistoryPromise.then(
            function (data) {
                let allKitsHistoryBody = $('#all-kit-history-body');

                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    allKitsHistoryBody.empty();
                    let tableRow, i = 0;
                    $.each(data[0], function (key, value) {
                        // let date = value['creation_date'];
                        tableRow = setTableRowColor(i++);

                        //elaboro le righe della tabella e le visualizzo
                        $.each(value, function (innerKey, innerValue) {
                            console.log(innerKey);
                            if (innerKey === 'kit_id') {
                                // tableRow.append('<td class="font-x-large darkblue-color center-text bold-text">' + innerValue + '</td>');
                            } else {
                                tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                            }
                        });
                        allKitsHistoryBody.append(tableRow).trigger('create');
                    });
                    showEmptyTable(allKitsHistoryBody, language['no-kit-to-show']);
                } else {
                    showEmptyTable(allKitsHistoryBody, language['no-server-response'] + ". <br> Error: " + data.message);
                }
            }
        );
    }
});


/**
 * Funzione che recupera tutti i kit
 * @param list - lista dei kit gia presenti che vanno eleiminati e sostituiti con quelli recuperati
 */
function getKits(list) {
    let allKitsPromise = httpPost('php/ajax/get_all_kits.php');

    allKitsPromise.then(
        function (data) {
            if (data.result){
                $.each(list.children(), function (key, value) {
                    if(key > 2){
                        $(value).remove();
                    }
                });

                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['kit_id'] + '">' + value['description'] + '</option>';
                });

                list.append(select);
                list.trigger('create');
            }
        }
    )
}

//gestione pulsante cornologia kit
$('#kits-history').on('click', function () {
    $('#see-kit-history-select option:eq(0)').prop('selected', true);
    $('#see-kit-history-select').selectmenu().selectmenu('refresh');

});