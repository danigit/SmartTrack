$('#insert-object').on('click', function () {
    $('#insert-object-menu').popup('close');
    $('#object-type-select').children('option:not(:first)').remove();

    let getTypesInsertObjectPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    getTypesInsertObjectPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '">' + value['type'] + '</option>';
                });
                $('#object-type-select').append(select);


                setTimeout(function () {
                    $('#insert-object-popup').popup();
                    $('#insert-object-popup').popup('open');
                    $('#object-type-select').listview();
                    $('#object-type-select').listview('refresh');
                }, 500);
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#error-msg-create-kit').find('.error-message').remove();
                $('#error-msg-create-kit').append(message);
            }
        }
    );
});

$('#close-input-object').on('click', function () {
    $('#insert-object-popup').popup('close');
});

$('#submit-input-object').on('click', function (e) {
    e.preventDefault();
    let insertObjectForm = new FormData();
    let type = $('#object-type-select').find(':selected').attr('id');
    if(type !== undefined) {
        insertObjectForm.append('type', type);
    }
    insertObjectForm.append('description', $('#object').val());

    let insertObjectPromise = httpPost('php/ajax/insert_object.php', insertObjectForm, 'POST');

    insertObjectPromise.then(
        function (data) {
            if (data.result) {
                // $('#' + elementName + ' option:eq(0)').prop('selected', true);
                $('#object').val("");
                $('#insert-object-message').append('<p>L\'oggetto e\' stato inserito con successo</p>');
                $('#insert-object-message').addClass('insert-object-success');
                setTimeout(function () {
                    $('#insert-object-message').empty();
                    $('#insert-object-message').removeClass('insert-object-success');
                }, 2000)
            }else{
                $('#insert-object-message').append('<p>' + data.message + '</p>');
                $('#insert-object-message').addClass('insert-object-error');
                setTimeout(function () {
                    $('#insert-object-message').empty();
                    $('#insert-object-message').removeClass('insert-object-error');
                }, 2000)
            }
        }
    )

});