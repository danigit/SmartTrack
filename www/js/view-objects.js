$('#view-objects').on('click', function () {
    $('#insert-object-menu').popup('close');
    $('#view-objects-ul').empty();

    let viewObjectsPromise = httpPost('php/ajax/get_objects.php', '', 'GET');

    viewObjectsPromise.then(
        function (data) {
            if (data.result) {
                $.each(data[0], function (key, value) {
                    $('#view-objects-ul').append('<li>' + value['name'] + '</li>')
                });


                $('#view-objects-ul').listview();
                $('#view-objects-ul').listview('refresh');
                setTimeout(function () {
                    $('#view-objects-popup').popup();
                    $('#view-objects-popup').popup('open');
                }, 500);

            }
        }
    )
});