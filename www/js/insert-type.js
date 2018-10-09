
$('#add-type').on('click', function (e) {
    e.preventDefault();

    let type = $('#type').val();
    console.log(type);

    let inputTypeForm = new FormData();
    inputTypeForm.append('type', type);

    let inputTypePromise = httpPost('php/ajax/insert_type.php', inputTypeForm, 'POST');

    inputTypePromise.then(
        function (data) {
            if (data.result) {
                $('#type').val("");
                $('#insert-type-message').empty();
                $('#insert-type-message').append('<p>L\'oggetto e\' stato inserito con successo</p>');
                $('#insert-type-message').addClass('insert-object-success');
                setTimeout(function () {
                    $('#insert-type-message').empty();
                    $('#insert-type-message').removeClass('insert-object-success');
                }, 2000)

                seeTypes();
            }else {
                $('#insert-type-message').empty();
                $('#insert-type-message').append('<p>Non e\' stato possibile inserire l\'oggetto</p>');
                $('#insert-type-message').addClass('insert-object-error');
                setTimeout(function () {
                    $('#insert-type-message').empty();
                    $('#insert-type-message').removeClass('insert-object-error');
                }, 2000)
            }
        }
    )
});

$('#update-type-popup-button').on('click', function () {
    $('#update-type-select').children('option:not(:first)').remove();

    let getTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    console.log('getting types update');
    getTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '">' + value['type'] + '</option>';
                });
                $('#update-type-select').append(select);
                $('#update-type-select').trigger('create');
            } else {
                //TODO messaggio errore
            }
        }
    );
});

$('#update-type').on('click', function (e) {
    e.preventDefault();

    let selectedType = $('#update-type-select').find(':selected').attr('id');
    console.log(selectedType);

    let type = $('#update-type-input').val();
    console.log(type);

    let inputTypeForm = new FormData();
    inputTypeForm.append('id', selectedType);
    inputTypeForm.append('value', type);

    if(type !== "" && type !== undefined && selectedType !== undefined) {
        let inputTypePromise = httpPost('php/ajax/update_type.php', inputTypeForm, 'POST');

        inputTypePromise.then(
            function (data) {
                if (data.result) {
                    console.log(data['rows']);
                    if (data["rows"] !== 1) {
                        $('#update-type-message').empty();
                        $('#update-type-message').append('<p>Non e\' stato possibile aggiornare l\'oggetto</p>');
                        $('#update-type-message').addClass('insert-object-error');
                        setTimeout(function () {
                            $('#update-type-message').empty();
                            $('#update-type-message').removeClass('insert-object-error');
                        }, 2000)
                    }else {
                        $('#update-type-input').val("");
                        $('#update-type-select option:eq(0)').prop('selected', true);
                        $('#update-type-select').selectmenu('refresh');
                        $('#update-type-message').empty();
                        $('#update-type-message').append('<p>L\'oggetto e\' stato aggiornato con successo</p>');
                        $('#update-type-message').addClass('insert-object-success');
                        setTimeout(function () {
                            $('#update-type-popup').popup('close');
                            $('#update-type-message').empty();
                            $('#update-type-message').removeClass('insert-object-success');
                        }, 2000)

                        seeTypes();
                    }
                }
            }
        )
    }else{
        $('#update-type-message').empty();
        $('#update-type-message').append('<p>Seleziona una tipologia e inserisci una descrizione</p>');
        $('#update-type-message').addClass('insert-object-error');
        setTimeout(function () {
            $('#update-type-message').empty();
            $('#update-type-message').removeClass('insert-object-error');
        }, 2000)
    }
});

$('#close-type').on('click', function (e) {
    e.preventDefault();
    $('#insert-type-popup').popup('close');
});