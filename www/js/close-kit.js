/**
 * Funzione che chiude un kit
 */
function closeKit() {
    //prendo l'id del kit da chiudere
    let kitId = closeKitObject.id;
    let missingObjects = [];

    let closeKitForm = new FormData();
    closeKitForm.append('id', kitId);

    //invio richiesta xmlhttp
    let kitOnjectsPromise = httpPost('php/ajax/get_objects_by_kit.php', closeKitForm, "POST");

    //interpreto risposta
    kitOnjectsPromise.then(
        function (data) {
            let closeKitBody = $('#close-kit-body');
            //controllo se ci sono stati degli errori nella chiamata
            if(data.result){
                closeKitBody.empty();
                let tableRow, i = 0;

                $.each(data[0], function (key, value) {
                    //coloro diversamente le righe della tabella
                    tableRow = setTableRowColor(i++);

                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey !== 'id'){
                            if( innerKey !== 'cod')
                                tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }else {
                            let tableCol = $('<td></td>');
                            let sendButton;

                            //creo pulsante der la segnalazione che l'oggetto e' disperso
                            sendButton = $('<a href="#" id="lan-missing-object-close-kit-button" class="ui-btn font-medium no-margin padding-10 red-color border-red-1 ' +
                                'border-radius-10" data-name="' + value['cod'] + '">' + language['lan-missing-object-close-kit-button'] + '</a>').
                                on('click', function () {
                                if($(this).hasClass('red-background')){
                                    $(this).removeClass('red-background');
                                    $(this).removeClass('white-color');
                                    $(this).addClass('red-color');
                                    //inserisco l'oggetto disperso nella lista degli oggetti dispersi
                                    missingObjects.splice($.inArray($(this).attr('data-name'), missingObjects), 1);
                                }else{
                                    $(this).addClass('red-background');
                                    $(this).removeClass('red-color');
                                    $(this).addClass('white-color');
                                    //rimuove l'oggetto disperso nella lista degli oggetti dispersi
                                    missingObjects.push($(this).attr('data-name'));
                                }
                            });

                            tableCol.append(sendButton);
                            tableRow.append(tableCol);
                        }
                    });
                    closeKitBody.append(tableRow).trigger('create');
                });
                showEmptyTable(closeKitBody, language['no-kit-to-show']);
            }else{
                showEmptyTable(closeKitBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );

    //gestisco il click sul pulsante chiusura oggetto
    $('#close-kit-and-save-button').on('click', function () {

        let closeKitObjectsIdForm = new FormData();
        let i = 0;

        //recupero gli oggetti da segnalare come dispersi
        $.each(missingObjects, function (key, value) {
            closeKitObjectsIdForm.append(i++, value);
        });

        closeKitObjectsIdForm.append('count', "" + i);
        closeKitObjectsIdForm.append('kit_id', "" + kitId);

        //invio la richiesta xmlhttp
        let closeKitAndSavePromise = httpPost('php/ajax/close_kit_and_save.php', closeKitObjectsIdForm, "POST");

        //interpreto risposta
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