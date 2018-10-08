
function seeTypes() {

        let viewTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

        viewTypesPromise.then(
            function (data) {
                if (data.result) {
                    $.each(data[0], function (key, value) {
                        $('#see-type-list-ul').append('<li class="center-text font-large margin-bottom-5 border-orange-1 border-radius-10 ui-btn margin-lr-auto width-90">' + value['type'] + '</li>')
                    });

                    $('#see-type-list-ul').listview();
                    $('#see-type-list-ul').listview('refresh');
                }
            }
        )
}