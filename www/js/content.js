/**
 * Recupero e visualizzo i kit aperti
 */

var closeKitObject = {};

function populateOpenKits() {
    let openKitsPromise = httpPost('php/ajax/get_open_kits.php', '', 'GET');

    openKitsPromise.then(
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
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'kit_id' ) {
                            tableRow.append('<td class="font-x-large green-color bold-text center-text">' + innerValue + '</td>');
                        }else if(innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow.append('<td class="font-x-large bold-tex center-text">' + innerValue + '</td>');
                        }else if(innerKey === 'spedisci'){
                            let tableCol = $('<td></td>');
                            let sendButton;
                            if(value['is_sent'] === "1") {
                                 sendButton = positionButton(value, innerValue);
                            }else{
                                sendButton = sendKitButton(innerValue);
                            }
                            tableCol.append(sendButton);
                            tableRow.append(tableCol);
                        }else if(innerKey === 'chiudi'){
                            let tableCol = $('<td></td>');
                            let sendButton = $('<a href="#close-kit" class="ui-btn font-medium no-margin padding-10 border-orange-1 red-color border-radius-10" data-name="' + innerValue + '">Chiudi kit</a>').on('click', function () {
                                closeKitObject['id'] = $(this).attr('data-name');
                                // closeKitObject['row'] = $(this).parent().parent();
                            });
                            tableCol.append(sendButton);
                            tableRow.append(tableCol);
                        }
                    });
                    $('#open-kit-body').append(tableRow).trigger('create');
                });
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#error-msg').find('.error-message').remove();
                $('#error-msg').append(message);
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
    return $('<a href="#" class="ui-btn font-medium no-margin padding-10 green-color border-green-1 border-radius-10" data-name="' + innerValue + '">Spedisci kit</a>').on('click', function () {
        sendKit($(this).attr('data-name'));
        setTimeout(function (){
            $('#open-kit-body').empty();
            populateOpenKits();
        }, 2000);
    });
}

/**
 * Funzione che gestisce la visualizzazione della posizione degli oggetti di un kit spedito
 * @param value - variabile per recuperare l'id del kit
 * @param innerValue -
 * @returns {*}
 */
function positionButton(value, innerValue) {
    return $('<a href="#see-kit-objects-position" class="ui-btn font-medium no-margin padding-10 green-color border-green-1 border-radius-10" data-name="' + innerValue + '">Visualizza posizione</a>').on('click', function () {
        $('#kit-objects-body').empty();
        let kitPositionForm = new FormData();
        kitPositionForm.append('id', value['kit_id']);
        let kitPositionPromise = httpPost('php/ajax/get_objects_kit_position.php', kitPositionForm, 'POST');

        kitPositionPromise.then(
            function (dataPosition) {
                if (dataPosition.result) {
                    $.each(dataPosition[0], function (dataKey, dataValue) {
                        let positionTableRow = $('<tr></tr>');
                        $.each(dataValue, function (innerDataKey, innerDataValue) {
                            if (innerDataKey === 'kit_id' || innerDataKey === 'cod'){
                                positionTableRow.append('<td class="font-x-large darkblue-color center-text bold-text">' + innerDataValue + '</td>');
                            } else {
                                positionTableRow.append('<td class="font-x-large center-text bold-text">' + innerDataValue + '</td>');
                            }
                        });
                        $('#kit-objects-body').append(positionTableRow);
                    })
                }
            }
        )
    });
}

function sendKit(id) {
    let sendKitForm = new FormData();
    sendKitForm.append('id', id);

    let openKitsPromise = httpPost('php/ajax/send_kit.php', sendKitForm, 'POST');

    openKitsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                showError("Kit spedito", "Il kit e' stato spedito", "success");
            }
        }
    );
}