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

$('#from').on('change', function () {
    if($('#all-objects').is(':checked')){
        getClosedKits();
    }else {
        seeAllKitsInsert();
    }
});

$('#to').on('change', function () {
    if($('#all-objects').is(':checked')){
        getClosedKits();
    }else {
        seeAllKitsInsert();
    }});

function seeAllKitsInsert(){
    let allKitsForm = new FormData();
    allKitsForm.append('from', $('#from').val());
    allKitsForm.append('to', $('#to').val());

    // console.log(allKitsForm.get('from'));
    // console.log(allKitsForm.get('to'));

    let allKitsPromise = httpPost('php/ajax/get_all_kits_by_date.php', allKitsForm, 'POST');

    allKitsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#all-kit-body').empty();
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
                        if(innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                        //segnalo i kit chiusi o aperti
                        else if(innerKey === 'closing_date'){
                            if(innerValue !== "") {
                                tableRow.append('<td class="font-x-large center-text">Si</td>');
                            }else{
                                tableRow.append('<td class="font-x-large center-text">No</td>');
                            }
                        }
                    });

                    let sendButton = $('<a href="#see-kits-history" class="ui-btn font-medium no-margin padding-10 border-green-1 ' +
                        'green-color border-radius-10" data-name="' + value['kit_id'] + '">Visualizza</a>').
                        on('click', function () {
                        kitObjectId['id'] = $(this).attr('data-name');
                        seeKitHistory($(this).attr('data-name'));
                    });

                    let tableElem = $('<td></td>');
                    tableElem.append(sendButton);
                    tableRow.append(tableElem);

                    $('#all-kit-body').append(tableRow).trigger('create');
                });

                if($('#all-kit-body').children().length === 0){
                    $('.table-empty').empty();
                    $('.table-empty').append('<p class="margin-top-50 center-text font-x-large bold-text red-color">Nessun kit da mostrare');
                }else {
                    $('.table-empty').empty();
                }
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

$('#all-objects').on('change', function () {
    if($('#all-objects').is(':checked')){
        getClosedKits();
    }else{
        seeAllKits();
    }
});

function getClosedKits() {
    let allClosedKitsForm = new FormData();
    allClosedKitsForm.append('from', $('#from').val());
    allClosedKitsForm.append('to', $('#to').val());

    let closedKitHistoryPromise = httpPost('php/ajax/get_closed_kits.php', allClosedKitsForm, 'POST');

    closedKitHistoryPromise.then(
        function (data) {
            if (data.result) {
                $('#all-kit-body').empty();
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
                        if(innerKey === 'closing_date') {
                            tableRow.append('<td class="font-x-large center-text">Si</td>');
                        }else if(innerKey === 'oggetti') {
                            let sendButton = $('<a href="#see-kits-history" class="ui-btn font-medium no-margin padding-10 border-green-1 ' +
                                'green-color border-radius-10" data-name="' + value['kit_id'] + '">Visualizza cronologia oggetti</a>').
                                on('click', function () {
                                kitObjectId['id'] = $(this).attr('data-name');
                                seeKitHistory($(this).attr('data-name'));
                                // closeKitObject['row'] = $(this).parent().parent();
                            });

                            let tableElem = $('<td></td>');
                            tableElem.append(sendButton);
                            tableRow.append(tableElem);
                        }else if(innerKey !== 'kit_id'){
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                    });
                    $('#all-kit-body').append(tableRow).trigger('create');
                });
            }
        }
    )
}
function seeKitHistory(id) {
    let kitHistoryForm = new FormData();
    kitHistoryForm.append('id', id);

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
                        if(innerKey === 'kit_id'){

                        } else if(innerKey === 'closing_date') {
                            tableRow.append('<td class="font-x-large center-text">Si</td>');
                        }else if(innerKey === 'oggetti') {

                        }else {
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
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
function seeKitObjects(id){

    let kitObjectsForm = new FormData();
    kitObjectsForm.append('id', id);

    let kitObjectsPromise = httpPost('php/ajax/get_objects_by_kit.php', kitObjectsForm, 'POST');

    kitObjectsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#see-kit-objects-body').empty();
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
                        if(innerKey === 'cod'){
                        }else{
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                    });

                    $('#see-kit-objects-body').append(tableRow).trigger('create');
                });

                if($('#see-kit-objects-body').children().length === 0){
                    $('.table-empty').append('<p class="margin-top-50 center-text font-x-large bold-text red-color">Nessun oggetto da mostrare');
                }else {
                    $('.table-empty').empty();
                }
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

function getIncompleteKits() {
    let allKitsPromise = httpPost('php/ajax/get_incomplete_kits.php', '', 'GET');

    allKitsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#all-incomplete-kits-body').empty();
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
                        if(innerKey === 'history'){

                        }else {
                            tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                    });

                    let sendButton = $('<a href="#see-kits-history" class="ui-btn font-medium no-margin padding-10 border-green-1 ' +
                        'green-color border-radius-10" data-name="' + value['history'] + '">Visualizza</a>').
                        on('click', function () {
                        seeKitHistory($(this).attr('data-name'));
                    });

                    let tableElem = $('<td></td>');
                    tableElem.append(sendButton);
                    tableRow.append(tableElem);
                    $('#all-incomplete-kits-body').append(tableRow).trigger('create');
                });

                showEmptyTable($('#all-incomplete-kits-body'), 'Nessun kit da mostrare');
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