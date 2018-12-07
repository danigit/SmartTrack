/**
 * Funzione che recupera tutti i kit e li visualizza in una tabella
 */

let kitObjectId = {};

function seeAllKits() {
    let nowDate = new Date();

    document.getElementById("to").valueAsDate = new Date();
    document.getElementById("from").valueAsDate = new Date(nowDate.setDate(nowDate.getDate() - 7));
    seeAllKitsInsert();
}

/**
 * Funzione che recupera tutti i kit e li salva in una tabella
 */
function seeAllKitsInsert(){

    //recuper i dati da mandare
    let allKitsForm = new FormData();
    allKitsForm.append('from', $('#from').val());
    allKitsForm.append('to', $('#to').val());

    //faccio chiamata xmlHttp
    let allKitsPromise = httpPost('php/ajax/get_all_kits_by_date.php', allKitsForm, 'POST');

    //interpreto risposta
    allKitsPromise.then(
        function (data) {
            let allKitBody = $('#all-kit-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                allKitBody.empty();
                let tableRow;
                let i = 0;
                $.each(data[0], function (key, value) {
                    tableRow = setTableRowColor(i++);

                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                        //segnalo i kit chiusi o aperti
                        else if(innerKey === 'closing_date'){
                            (innerValue !== "") ? tableRow.append('<td class="font-x-large center-text">Si</td>')
                                                : tableRow.append('<td class="font-x-large center-text">No</td>');
                        }
                    });

                    let sendButton = $('<a href="#see-kits-history" class="ui-btn font-medium no-margin padding-10 border-green-1 ' +
                        'green-color border-radius-10" data-name="' + value['kit_id'] + '">' + language['see-history-all-kits'] + '</a>').
                        on('click', function () {
                            kitObjectId['id'] = $(this).attr('data-name');
                            seeKitHistory($(this).attr('data-name'));
                        });

                    let tableElem = $('<td></td>');
                    tableElem.append(sendButton);
                    tableRow.append(tableElem);

                    allKitBody.append(tableRow).trigger('create');
                });

                showEmptyTable(allKitBody, language['no-kit-to-show']);
            } else {
                showEmptyTable(allKitBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}

//cambiamento data inizio
$('#from').on('change', function () {
    if($('#all-objects').is(':checked')){
        getClosedKits();
    }else {
        seeAllKitsInsert();
    }
});

//cambio data fine
$('#to').on('change', function () {
    if($('#all-objects').is(':checked')){
        getClosedKits();
    }else {
        seeAllKitsInsert();
    }});

//cambio casella di selezione kit chiusi
$('#all-objects').on('change', function () {
    if($('#all-objects').is(':checked')){
        getClosedKits();
    }else{
        seeAllKits();
    }
});

/**
 * Funzione che recupera i kit chiusi
 */
function getClosedKits() {

    //recupero i dati da inviare
    let allClosedKitsForm = new FormData();
    allClosedKitsForm.append('from', $('#from').val());
    allClosedKitsForm.append('to', $('#to').val());

    //invio dati attraverso xmlHttp request
    let closedKitHistoryPromise = httpPost('php/ajax/get_closed_kits.php', allClosedKitsForm, 'POST');

    //interpreto risposta
    closedKitHistoryPromise.then(
        function (data) {
            let allKitBody = $('#all-kit-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                allKitBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    //coloro una riga e una no
                    tableRow = setTableRowColor(i++);

                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'closing_date') {
                            tableRow.append('<td class="font-x-large center-text">Si</td>');
                        }else if(innerKey === 'oggetti') {
                            let sendButton = $('<a href="#see-kits-history" id="lan-all-kits-visualizza-button" class="ui-btn font-medium no-margin padding-10 border-green-1 ' +
                                'green-color border-radius-10" data-name="' + value['kit_id'] + '">' + language['lan-all-kits-visualizza-button'] + '</a>').
                                on('click', function () {
                                    kitObjectId['id'] = $(this).attr('data-name');
                                    seeKitHistory($(this).attr('data-name'));
                                });

                            let tableElem = $('<td></td>');
                            tableElem.append(sendButton);
                            tableRow.append(tableElem);
                        }else if(innerKey !== 'kit_id'){
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                    });
                    allKitBody.append(tableRow).trigger('create');
                });
                showEmptyTable(allKitBody, language['no-kit-to-show']);
            }else {
                showEmptyTable(allKitBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    )
}

/***
 * Funzione che recuperra la cronologia del kit passato come parametro
 * @param id - il kit per il quale recuperare la cronologia
 */
function seeKitHistory(id) {
    //recupero informazini da inviare
    let kitHistoryForm = new FormData();
    kitHistoryForm.append('id', id);

    //invio richiesta xmlHttp
    let kitHistoryPromise = httpPost('php/ajax/get_history_by_kit.php', kitHistoryForm, 'POST');

    //interpreto risposta
    kitHistoryPromise.then(
        function (data) {
            let allKitHistoryBody = $('#all-kit-history-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                allKitHistoryBody.empty();
                let tableRow,i = 0, date;
                $.each(data[0], function (key, value) {
                    if(date !== undefined && (Math.abs(new Date(value['timestamp']) - date) / 1000) > 30 ){
                        //creo colori diversi per diverse righe
                        tableRow = setTableRowColor(i++);
                        tableRow.append('<td colspan="4" class="font-x-large center-text"><hr class="border-blue-2"></td>');

                        allKitHistoryBody.append(tableRow).trigger('create');
                    }

                    //creo colori diversi per diverse righe
                    tableRow = setTableRowColor(i++);

                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'closing_date')
                            tableRow.append('<td class="font-x-large center-text">Si</td>');
                        else if (innerKey !== 'kit_id' || innerKey !== 'oggetti')
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                    });

                    allKitHistoryBody.append(tableRow).trigger('create');
                    date = new Date(value['timestamp']);
                });
                showEmptyTable(allKitHistoryBody, language['no-kit-to-show']);
            } else {
                showEmptyTable(allKitHistoryBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}

/**
 * Funzione che visualizza gli oggetti del kit passato come parametro
 * @param id - il kit per cui bisogna visualizzare gli oggetti
 */
function seeKitObjects(id){

    //recupero le informazioni da mandare
    let kitObjectsForm = new FormData();
    kitObjectsForm.append('id', id);

    //invio le informazioni attraverso una richiesta xmlhttp
    let kitObjectsPromise = httpPost('php/ajax/get_objects_by_kit.php', kitObjectsForm, 'POST');

    //interpreto la risposta
    kitObjectsPromise.then(
        function (data) {
            let seeKitObjectsBody = $('#see-kit-objects-body');

            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                seeKitObjectsBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    //coloro le righe diversamente
                    tableRow = setTableRowColor(i++);

                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey !== 'cod')
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                    });

                    seeKitObjectsBody.append(tableRow).trigger('create');
                });

                showEmptyTable(seeKitObjectsBody, language['no-kit-to-show']);
            } else {
                showEmptyTable(seeKitObjectsBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}

/**
 * Funzione che recupera i kit incompleti
 */
function getIncompleteKits() {
    //invio la richiesta xmlhttp
    let allKitsPromise = httpPost('php/ajax/get_incomplete_kits.php', '', 'GET');

    //interpreto la risposta
    allKitsPromise.then(
        function (data) {
            let allIncompleteKitsBody = $('#all-incomplete-kits-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let allIncompleteKitsBody = $('#all-incomplete-kits-body');
                allIncompleteKitsBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    tableRow = setTableRowColor(i++);

                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey !== 'history')
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                    });

                    let sendButton = $('<a href="#see-kits-history" class="ui-btn font-medium no-margin padding-10 border-green-1 ' +
                        'green-color border-radius-10" data-name="' + value['history'] + '">' + language['see-history-button'] + '</a>').
                        on('click', function () {
                            seeKitHistory($(this).attr('data-name'));
                        });

                    let tableElem = $('<td></td>');
                    tableElem.append(sendButton);
                    tableRow.append(tableElem);
                    allIncompleteKitsBody.append(tableRow).trigger('create');
                });

                showEmptyTable(allIncompleteKitsBody, language['no-kit-to-show']);
            } else {
                showEmptyTable(allIncompleteKitsBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}