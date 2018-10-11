/**
 * Funzione che chiude un kit
 */
function closeKit() {
    //prendo l'id del kit da chiudere
    let kitId = closeKitObject.id;
    let missingObjects = [];

    let closeKitForm = new FormData();
    closeKitForm.append('id', kitId);

    let kitOnjectsPromise = httpPost('php/ajax/get_objects_by_kit.php', closeKitForm, "POST");

    kitOnjectsPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if(data.result){
                let tableRow;
                let i = 0;

                $.each(data[0], function (key, value) {
                    //coloro diversamente le righe della tabella
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

                            //creo pulsante der la segnalazione che l'oggetto e' disperso
                            sendButton = $('<a href="#" class="ui-btn font-medium no-margin padding-10 red-background white-color border-radius-10" data-name="' + value['cod'] + '">Oggetto disperso</a>').on('click', function () {
                                //inserisco l'oggetto disperso nella lista degli oggetti dispersi
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

    //gestisco il click sul pulsante chiusura oggetto
    $('#close-kit-and-save-button').on('click', function () {
        let closeKitObjectsIdForm = new FormData();
        let i = 0;

        //carico gli oggetti da segnalare come dispersi
        $.each(missingObjects, function (key, value) {
            closeKitObjectsIdForm.append(i++, value);
        });

        closeKitObjectsIdForm.append('count', "" + i);
        closeKitObjectsIdForm.append('kit_id', "" + kitId);

        let closeKitAndSavePromise = httpPost('php/ajax/close_kit_and_save.php', closeKitObjectsIdForm, "POST");
        
        closeKitAndSavePromise.then(
            function (data) {

                let closeKitPopup = $('#close-kit-popup');
                closeKitPopup.find('p').text("");
                closeKitPopup.find('span').text("");

                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    //mostro messaggio di successo poi ritorno nella home
                    closeKitPopup.find('p').text("CHIUSURA AVVENUTA CON SUCCESSO");
                    closeKitPopup.find('span').text('Il kit e\' stato chiuso con successo');
                    closeKitPopup.popup('open');
                    setTimeout(function () {
                        document.location.href = 'content.php';
                    }, 2000);
                }else {
                    //mostro messaggio di errore poi ritorno nella home
                    closeKitPopup.removeClass('success-popup');
                    closeKitPopup.addClass('error-popup');
                    closeKitPopup.find('p').text("IMPOSSIBILE CHIUDERE KIT");
                    closeKitPopup.find('span').text(data.message);
                    closeKitPopup.popup('open');
                    setTimeout(function () {
                        document.location.href = 'content.php';
                    }, 2000);
                }
            }
        )
    });
}