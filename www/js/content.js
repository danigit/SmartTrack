/**
 * Developer: Daniel Surpanu
 */

let closeKitObject = {};

/**
 * Funzione che insersce nella tabella i kit aperti
 */
function populateOpenKits() {
    //invio richiesta xmlhttp
    let openKitsPromise = httpPost('php/ajax/get_open_kits.php', '', 'GET');

    //interpreto risposta
    openKitsPromise.then(
        function (data) {
            let openKitBody = $('#open-kit-body');

            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                openKitBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    tableRow = setTableRowColor(i++);

                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow.append('<td class="font-x-large bold-tex center-text">' + innerValue + '</td>');
                        }else if(innerKey === 'oggetti'){
                            let tableColSeeObjects = $('<td></td>');
                            let seeObjects = $('<a href="#see-kit-objects" class="ui-btn font-medium no-margin padding-10 border-green-1 green-color ' +
                                'border-radius-10 inset-shadow-green" data-name="' + innerValue + '">' + language['see-objects-button'] + '</a>').on('click', function () {
                                seeKitObjects($(this).attr('data-name'));
                            });
                            tableColSeeObjects.append(seeObjects);
                            tableRow.append(tableColSeeObjects);
                        }else if(innerKey === 'spedisci'){
                            let sendButton = positionButton(value['is_sent'] === "1", value, innerValue);
                            tableRow.append($('<td></td>').append(sendButton));
                        }else if(innerKey === 'chiudi'){
                            let sendButton = $('<a href="#close-kit" class="ui-btn font-medium no-margin padding-10 border-orange-1 red-color inset-shadow-orange ' +
                                'border-radius-10" data-name="' + innerValue + '">' + language['close-kit-button'] + '</a>').on('click', function () {
                                closeKitObject['id'] = $(this).attr('data-name');
                            });
                            tableRow.append($('<td></td>').append(sendButton));
                        }
                    });
                    openKitBody.append(tableRow).trigger('create');
                });

                showEmptyTable(openKitBody, language['no-kit-to-show']);
            } else {
                showEmptyTable(openKitBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}

/**
 * Funzione che gestisce la spedizione di un kit
 * @param innerValue
 * @returns {void|*|jQuery}
 */
function sendKitButton(innerValue) {
    return $('<a href="#" class="ui-btn font-medium no-margin padding-10 green-color border-green-1 border-radius-10 inset-shadow-green" data-name="' +
        innerValue + '">' + language['send-kit-button'] + '</a>').on('click', function () {
        sendKit($(this).attr('data-name'));
        setTimeout(function (){
            $('#open-kit-body').empty();
            populateOpenKits();
        }, 2000);
    });
}

/**
 * Funzione che crea e gestisce la visualizzazione della posizione degli oggetti di un kit spedito, e crea e gestisce la spedizione di un kit
 * @param isSent
 * @param value - variabile per recuperare l'id del kit
 * @param innerValue -
 * @returns {*}
 */
function positionButton(isSent, value, innerValue) {
    if(isSent) {
        return $('<a href="#see-kit-objects-position" class="ui-btn font-medium no-margin padding-10 green-color border-green-1 border-radius-10 inset-shadow-green" ' +
            'data-name="' + innerValue + '">' + language['see-position-button'] + '</a>').on('click', function () {
            let kitObjectsBody = $('#kit-objects-body');
            kitObjectsBody.empty();

            //raccolgo le informazioni
            let kitPositionForm = new FormData();
            kitPositionForm.append('id', value['spedisci']);

            //invio richiesta xmlhttp
            let kitPositionPromise = httpPost('php/ajax/get_objects_kit_position.php', kitPositionForm, 'POST');

            //interpreto risposta
            kitPositionPromise.then(
                function (dataPosition) {
                    //controllo se ci sono errori nella risposta
                    if (dataPosition.result) {
                        $.each(dataPosition[0], function (dataKey, dataValue) {
                            let positionTableRow = $('<tr></tr>');
                            $.each(dataValue, function (innerDataKey, innerDataValue) {
                                if (innerDataKey === 'kit_id' || innerDataKey === 'cod' || innerDataKey === 'environment') {
                                }else{
                                    positionTableRow.append('<td class="font-x-large center-text bold-text">' + innerDataValue + '</td>');
                                }
                            });
                            kitObjectsBody.append(positionTableRow);
                        });
                        showEmptyTable(kitObjectsBody, "Nessun oggetto da mostrare");
                    }else {
                        showEmptyTable(kitObjectsBody, language['no-server-response'] + '<br>Error: ' + dataPosition.message)
                    }
                }
            )
        });
    }else {
        return sendKitButton(innerValue);
    }
}

/**
 * Funzione che spedisce un kit
 * @param id - il kit da spedire
 */
function sendKit(id) {
    //recupero informazioni
    let sendKitForm = new FormData();
    sendKitForm.append('id', id);

    //invio richiesta xmlhttp
    let openKitsPromise = httpPost('php/ajax/send_kit.php', sendKitForm, 'POST');

    //interpreto risposta
    openKitsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                showError($('#error-content-popup'), "Kit spedito", "Il kit è stato spedito", "success");
            }else{
                showError($('#error-content-popup'), 'Kit non spedito', 'Il kit non è stato spedito. Errore: ' + data.message, 'error');
            }
        }
    );
}