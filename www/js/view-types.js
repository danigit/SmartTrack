
function seeTypes() {
    let seeTypeListUl = $('#see-type-list-ul');
    seeTypeListUl.empty();

    let viewTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    viewTypesPromise.then(
        function (data) {
            if (data.result) {
                $.each(data[0], function (key, value) {
                    let objectList = $('<li id="' + value['id'] + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 border-radius-10">' + value['type'] + '</a></li>');

                    //creo il pulsante per la cancellazione delle tipologie
                    let deleteElem = $('<a href="#" id="' + value['id'] + '" data-name="' + value['type'] + '" class="ui-icon-redminus border-red-1 border-radius-10">Elimina tipologia</a>').on('click', function () {
                        let parent = $(this).parent();
                        let deleteTypeForm = new FormData();

                        deleteTypeForm.append('id', value['id']);

                        confirmDeleteType('Cancella tipologia', 'Sei sicuro di voler cancellare la tipologia?', 'Cancella tipologia', function () {
                            let deleteTypePromise = httpPost('php/ajax/delete_type.php', deleteTypeForm, 'POST');

                            deleteTypePromise.then(
                                function (data) {
                                    if (data.result) {
                                        $(parent).remove();
                                    }
                                }
                            );
                        });
                        // $('#type-list-ul').append(inserRow(key, value));
                        // $('#type-list-ul').listview('refresh');
                    });
                    objectList.append(deleteElem);
                    $('#see-type-list-ul').append(objectList);
                });

                seeTypeListUl.listview();
                seeTypeListUl.listview('refresh');

                if(seeTypeListUl.children().length === 0){
                    seeTypeListUl.append('<li class="font-large"><a class="border-red-1 border-radius-10 center-text red-color">Nessuna tipologia da mostrare</a></li>');
                    seeTypeListUl.listview();
                    seeTypeListUl.listview('refresh');
                }
            }
        }
    )
}

function confirmDeleteType(title, content, button, callback) {
    $("#delete-type-confirm .delete-type-confirm-header").text(title);
    $("#delete-type-confirm .delete-type-confirm-text").text(content);
    $("#delete-type-confirm .delete-type-confirm-button").text(button).on("click.delete-type-confirm", function() {
        callback();
    });
    $('#delete-type-confirm').popup('open');
}
