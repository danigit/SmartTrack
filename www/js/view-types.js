
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
                        console.log('inserting seccond: ' + key + '/' + value);
                        let deleteTypeForm = new FormData();

                        deleteTypeForm.append('id', value['id']);

                        let deleteTypePromise = httpPost('php/ajax/delete_type.php', deleteTypeForm, 'POST');

                        deleteTypePromise.then(
                            function (data) {
                                if (data.result) {
                                    $(parent).remove();
                                }
                            }
                        )
                        // $('#type-list-ul').append(inserRow(key, value));
                        // $('#type-list-ul').listview('refresh');
                    });
                    objectList.append(deleteElem);
                    $('#see-type-list-ul').append(objectList);
                });

                seeTypeListUl.listview();
                seeTypeListUl.listview('refresh');
            }
        }
    )
}