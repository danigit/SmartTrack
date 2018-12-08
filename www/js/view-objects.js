/**
 * Developer: Daniel Surpanu
 */

/**
 * Funzione che visualizza gli oggetti
 */
function seeObjects() {
    let seeObjectListUl = $('#see-object-list-ul');
    let seeObjectsErrorPopup = $('#see-objects-error-popup');
    seeObjectListUl.empty();

    //invio richiesta smlhttp
    let viewTypesPromise = httpPost('php/ajax/get_objects.php', '', 'GET');

    //interpreto la risposta
    viewTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $.each(data[0], function (key, value) {
                    let objectList = $('<li id="' + value['id'] + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 ' +
                        'border-radius-10">' + value['name'] + '</a></li>');

                    //creo il pulsante per l'eliminazione degli oggetti
                    let deleteElem = $('<a href="#" id="' + value['id'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus border-red-1 ' +
                        'border-radius-10">Elimina oggetto</a>').on('click', function () {
                        let parent = $(this).parent();

                        //recupero dati da inviare
                        let deleteObjectForm = new FormData();
                        deleteObjectForm.append('id', value['id']);

                        confirmDeleteObject(language['lan-cancel-object-confirm-title'], language['lan-cancel-object-confirm-content'], language['lan-cancel-object-confirm-title'], function () {
                            //invio richiesta xmlhttp
                            let deleteObjectPromise = httpPost('php/ajax/delete_object.php', deleteObjectForm, 'POST');

                            //interpreto risposta
                            deleteObjectPromise.then(
                                function (data) {
                                    //controllo se ci sono stati errori nella risposta
                                    if (data.result) {
                                        $(parent).remove();
                                    }else{
                                        seeObjectsErrorPopup.find('p').text(language['lan-impossible-eliminate-object-title']);
                                        seeObjectsErrorPopup.find('span').text(language['lan-impossible-eliminate-object-content'] + data.message);
                                        seeObjectsErrorPopup.popup('open');
                                        setTimeout(function () {
                                            seeObjectsErrorPopup.popup('close');
                                        }, 2000);
                                    }
                                }
                            )
                        });
                    });
                    objectList.append(deleteElem);
                    $('#see-object-list-ul').append(objectList);
                });
                seeObjectListUl.listview();
                seeObjectListUl.listview('refresh');

                showNoElementInList(seeObjectListUl);
            }else{
                //TODO show error message
            }
        }
    )
}
