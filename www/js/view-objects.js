
function seeObjects() {
    $('#see-object-list-ul').empty();

    let viewTypesPromise = httpPost('php/ajax/get_objects.php', '', 'GET');

    viewTypesPromise.then(
        function (data) {
            if (data.result) {
                $.each(data[0], function (key, value) {
                    let objectList = $('<li id="' + value['id'] + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 border-radius-10">' + value['name'] + '</a></li>');
                    let deleteElem = $('<a href="#" id="' + value['id'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus border-red-1 border-radius-10">Elimina tipologia</a>').on('click', function () {
                        let parent = $(this).parent();
                        console.log('inserting seccond: ' + key + '/' + value);
                        let deleteObjectForm = new FormData();

                        deleteObjectForm.append('id', value['id']);

                        let deleteObjectPromise = httpPost('php/ajax/delete_object.php', deleteObjectForm, 'POST');

                        deleteObjectPromise.then(
                            function (data) {
                                if (data.result) {
                                    $(parent).remove();
                                }
                            }
                        )
                    });
                    objectList.append(deleteElem);
                    $('#see-object-list-ul').append(objectList);
                });

                $('#see-object-list-ul').listview();
                $('#see-object-list-ul').listview('refresh');
            }
        }
    )
}