$('#view-types').on('click', function () {
    $('#insert-type-menu').popup('close');
    $('#view-types-ul').empty();

    let viewTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    viewTypesPromise.then(
        function (data) {
            if (data.result) {
               $.each(data[0], function (key, value) {
                   $('#view-types-ul').append('<li>' + value['type'] + '</li>')
               });


               $('#view-types-ul').listview();
               $('#view-types-ul').listview('refresh');
               setTimeout(function () {
                   $('#view-types-popup').popup();
                   $('#view-types-popup').popup('open');
               }, 500);

           }
       }
   )
});