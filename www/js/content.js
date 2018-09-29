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
                $.each(data[0], function (key, value) {
                    tableRow = $('<tr></tr>');
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'kit_id' || innerKey === 'description' || innerKey === 'creation_date') {
                            tableRow.append('<td class="font-x-large">' + innerValue + '</td>');
                        }else if(innerKey === 'spedisci'){
                            let tableCol = $('<td></td>');
                            let sendButton;
                            if(value['is_sent'] === "1") {
                                sendButton = $('<a href="#" class="ui-btn font-small green-background white-color ui-disabled" data-name="' + innerValue + '">Spedisci kit</a>').on('click', function () {
                                    $(this).css('background', 'red');
                                    sendKit($(this).attr('data-name'));
                                    $(this).addClass('ui-disabled');
                                });
                            }else{
                                sendButton = $('<a href="#" class="ui-btn font-small green-background white-color" data-name="' + innerValue + '">Spedisci kit</a>').on('click', function () {
                                    $(this).css('background', 'red');
                                    sendKit($(this).attr('data-name'));
                                    $(this).addClass('ui-disabled');
                                });
                            }
                            tableCol.append(sendButton);
                            tableRow.append(tableCol);
                        }else if(innerKey === 'chiudi'){
                            let tableCol = $('<td></td>');
                            let sendButton = $('<a href="#close-kit?name=daniel&surname=surpanu" class="ui-btn font-small red-background white-color" data-name="' + innerValue + '">Chiudi kit</a>').on('click', function () {
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

function sendKit(id) {
    let sendKitForm = new FormData();
    sendKitForm.append('id', id);

    let openKitsPromise = httpPost('php/ajax/send_kit.php', sendKitForm, 'POST');

    openKitsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                console.log('kit send registered');
            }
        }
    );
}