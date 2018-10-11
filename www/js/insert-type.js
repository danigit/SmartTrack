
$('#add-type').on('click', function (e) {
    e.preventDefault();

    let insertTypeMessage = $('#insert-type-message');

    let type = $('#type').val();

    let inputTypeForm = new FormData();
    inputTypeForm.append('type', type);

    let inputTypePromise = httpPost('php/ajax/insert_type.php', inputTypeForm, 'POST');

    inputTypePromise.then(
        function (data) {
            if (data.result) {
                $('#type').val("");
                showMessage(insertTypeMessage, 'La tipologia e\' stata inserita con successo', 'insert-object-success');
                seeTypes();
            }else {
                showMessage(insertTypeMessage, 'Non e\' stato possibile inserire l\'oggetto', 'insert-object-error');
            }
        }
    )
});

$('#update-type-popup-button').on('click', function () {
    getTypes($('#update-type-select'));

    $('#update-type-input').val("");

    $('#update-type-select option:eq(0)').prop('selected', true);
    $('#update-type-select').selectmenu('refresh');
});

$('#update-type').on('click', function (e) {
    e.preventDefault();
    let updateTypeMessage = $('#update-type-message');

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
                    if (data["rows"] !== 1) {
                        showMessage(updateTypeMessage, 'Non e\' stato possibile aggiornare l\'oggetto', 'insert-object-error');
                    }else {
                        $('#update-type-input').val("");
                        $('#update-type-select option:eq(0)').prop('selected', true);
                        $('#update-type-select').selectmenu('refresh');
                        showMessage(updateTypeMessage, 'L\'oggetto e\' stato aggiornato con successo', 'insert-object-success');

                        setTimeout(function () {
                            $('#update-type-popup').popup('close');
                        }, 2000)
                        seeTypes();
                    }
                }
            }
        )
    }else{
        showMessage(updateTypeMessage, 'Seleziona una tipologia e inserisci una descrizione', 'insert-object-error');
    }
});

$('#close-object-popup').on('click', function (e) {
    e.preventDefault();
    $('#insert-object-popup').popup('close');
});