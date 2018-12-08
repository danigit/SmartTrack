/**
 * Developer: Daniel Surpanu
 */

/**
 * Funzione che mostra tutti i tipi
 */
function seeTypes() {
    let seeTypeListUl = $('#see-type-list-ul');
    let seeTypesErrorPopup = $('#see-type-error-popup');

    seeTypeListUl.empty();

    //invio richiesta xmlhttp
    let viewTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    //interpreto risposta
    viewTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori
            if (data.result) {
                $.each(data[0], function (key, value) {
                    let objectList = $('<li id="' + value['id'] + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 ' +
                        'border-radius-10">' + value['type'] + '</a></li>');

                    //creo il pulsante per la cancellazione delle tipologie
                    let deleteElem = $('<a href="#" id="' + value['id'] + '" data-name="' + value['type'] + '" class="ui-icon-redminus border-red-1 ' +
                        'border-radius-10">Elimina tipologia</a>').on('click', function () {
                        let parent = $(this).parent();
                        let deleteTypeForm = new FormData();

                        deleteTypeForm.append('id', value['id']);

                        confirmDeleteType(language['lan-delete-type-confirm-title'], language['lan-delete-type-confirm-content'], language['lan-delete-type-confirm-title'], function () {
                            //invio richiesta xmlhttp
                            let deleteTypePromise = httpPost('php/ajax/delete_type.php', deleteTypeForm, 'POST');

                            //interpreto risposta
                            deleteTypePromise.then(
                                function (data) {
                                    //controllo se ci sono stati degli errori
                                    if (data.result) {
                                        $(parent).remove();
                                    }else{
                                        seeTypesErrorPopup.find('p').text(language['lan-impossible-to-delete-type-title']);
                                        seeTypesErrorPopup.find('span').text(language['lan-impossible-to-delete-type-content'] + data.message);
                                        seeTypesErrorPopup.popup('open');
                                        setTimeout(function () {
                                            seeTypesErrorPopup.popup('close');
                                        }, 2000);
                                    }
                                }
                            );
                        });
                    });
                    objectList.append(deleteElem);
                    $('#see-type-list-ul').append(objectList);
                });

                seeTypeListUl.listview();
                seeTypeListUl.listview('refresh');

                showNoElementInList(seeTypeListUl);
            }
        }
    )
}

/**
 * Funzione che mostra un messaggio se la lista è vuota
 * @param list - la lista da controllare
 */
function showNoElementInList(list) {
    if(list.children().length === 0){
       list.append('<li class="font-large"><a class="border-red-1 border-radius-10 center-text red-color">' + language['lan-no-type-to-show'] + '</a></li>');
       list.listview();
       list.listview('refresh');
    }
}

