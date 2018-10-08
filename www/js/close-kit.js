/**
 * Funzione che chiude il kit passato come parametro
 */

function closeKit() {
    let kitId = closeKitObject.id;
    let missingObjects = [];
    console.log('the kit id closed is: ' + closeKitObject.id);

    let closeKitForm = new FormData();
    closeKitForm.append('id', kitId);

    let kitOnjectsPromise = httpPost('php/ajax/get_objects_by_kit.php', closeKitForm, "POST");

    kitOnjectsPromise.then(
        function (data) {
            if(data.result){
                let tableRow;
                let i = 0;
                $.each(data[0], function (key, value) {
                    if((i++ % 2) === 0) {
                        tableRow = $('<tr></tr>');
                    }else{
                        tableRow = $('<tr class="gray-background"></tr>')
                    }
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey !== 'id'){
                            tableRow.append('<td class="font-x-large">' + innerValue + '</td>');
                        }else {
                            let tableCol = $('<td></td>');
                            let sendButton;

                            sendButton = $('<a href="#" class="ui-btn font-medium no-margin padding-10 red-background white-color border-radius-10" data-name="' + value['cod'] + '">Oggetto disperso</a>').on('click', function () {
                                missingObjects.push($(this).attr('data-name'));
                                $(this).parent().parent().remove();
                            });

                            tableCol.append(sendButton);
                            tableRow.append(tableCol);
                        }
                    });
                    $('#close-kit-body').append(tableRow).trigger('create');
                });
            }
        }
    );

    $('#close-kit-and-save-button').on('click', function () {
        let closeKitObjectsIdForm = new FormData();
        let i = 0;

        $.each(missingObjects, function (key, value) {
            closeKitObjectsIdForm.append(i++, value);
        });

        closeKitObjectsIdForm.append('count', "" + i);
        closeKitObjectsIdForm.append('kit_id', "" + kitId);

        let closeKitAndSavePromise = httpPost('php/ajax/close_kit_and_save.php', closeKitObjectsIdForm, "POST");
        
        closeKitAndSavePromise.then(
            function (data) {
                if (data.result) {
                    console.log(data);
                }
            }
        )
    });

    // let closeKitPromise = httpPost('php/ajax/close_kit.php', closeKitForm, 'POST');
    //
    // closeKitPromise.then(
    //     function (data) {
    //         //controllo se ci sono stati degli errori nella chiamata
    //         if (data.result) {
    //             //TODO mostrare il messaggio che il kit e' stato chiuso
    //
    //             //rimuovo il kit chiuso
    //         } else {
    //             let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
    //             if ($('.error-message').length !== 0)
    //                 $('#error-msg').find('.error-message').remove();
    //             $('#error-msg').append(message);
    //
    //             //mostro il messaggio per 3 sec
    //             setTimeout(function () {
    //                 $('#error-msg').find('.error-message').remove();
    //             }, 3000);
    //         }
    //     }
    // );
}