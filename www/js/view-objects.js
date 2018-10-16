
function seeObjects() {
    let seeObjectListUl = $('#see-object-list-ul');
    seeObjectListUl.empty();

    let viewTypesPromise = httpPost('php/ajax/get_objects.php', '', 'GET');

    viewTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $.each(data[0], function (key, value) {
                    let objectList = $('<li id="' + value['id'] + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 border-radius-10">' + value['name'] + '</a></li>');

                    //creo il pulsante per l'eliminazione degli oggetti
                    let deleteElem = $('<a href="#" id="' + value['id'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus border-red-1 border-radius-10">Elimina oggetto</a>').on('click', function () {
                        let parent = $(this).parent();
                        let deleteObjectForm = new FormData();

                        deleteObjectForm.append('id', value['id']);

                        confirmDeleteObject('Cancella oggetto', 'Sei sicuro di voler cancellare l\'oggetto?', 'Cancella oggetto', function () {
                            let deleteObjectPromise = httpPost('php/ajax/delete_object.php', deleteObjectForm, 'POST');

                            deleteObjectPromise.then(
                                function (data) {
                                    if (data.result) {
                                        $(parent).remove();
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
            }
        }
    )
}


function confirmDeleteObject(title, content, button, callback) {
    $("#delete-object-confirm .delete-object-confirm-header").text(title);
    $("#delete-object-confirm .delete-object-confirm-text").text(content);
    $("#delete-object-confirm .delete-object-confirm-button").text(button).on("click.delete-type-confirm", function() {
        callback();
    });
    $('#delete-object-confirm').popup('open');
}