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

    let viewTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    viewTypesPromise.then(
        function (data) {
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

                        confirmDeleteType('Cancella tipologia', 'Sei sicuro di voler cancellare la tipologia?', 'Cancella tipologia', function () {
                            let deleteTypePromise = httpPost('php/ajax/delete_type.php', deleteTypeForm, 'POST');

                            deleteTypePromise.then(
                                function (data) {
                                    if (data.result) {
                                        $(parent).remove();
                                    }else{
                                        seeTypesErrorPopup.find('p').text("IMPOSSIBILE ELIMINARE TIPOLOGIA");
                                        seeTypesErrorPopup.find('span').text('Non è stato possibile eliminare la tipologia. Errore: ' + data.message);
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
       list.append('<li class="font-large"><a class="border-red-1 border-radius-10 center-text red-color">Nessuna tipologia da mostrare</a></li>');
       list.listview();
       list.listview('refresh');
    }
}

/**
 * Funzione che mostra il messaggio di conferma elim
 * @param title
 * @param content
 * @param button
 * @param callback
 */
function confirmDeleteType(title, content, button, callback) {
    $("#delete-type-confirm .delete-type-confirm-button").unbind('click');
    $("#delete-type-confirm .delete-type-confirm-header").text(title);
    $("#delete-type-confirm .delete-type-confirm-text").text(content);
    $("#delete-type-confirm .delete-type-confirm-button").text(button).on("click", function() {
        callback();
    });
    $('#delete-type-confirm').popup('open');
}
