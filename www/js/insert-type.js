/**
 * Developer: Daniel Surpanu
 */



$('#add-type').on('click', function (e) {
    e.preventDefault();
    let type = $('#type');

    let insertTypeMessage = $('#insert-type-message');

    if(type.val() !== "") {
        let inputTypeForm = new FormData();
        inputTypeForm.append('type', type.val());

        let inputTypePromise = httpPost('php/ajax/insert_type.php', inputTypeForm, 'POST');

        inputTypePromise.then(
            function (data) {
                if (data.result) {
                    type.val("");
                    showMessage(insertTypeMessage, 'La tipologia è stata inserita con successo', 'insert-object-success');
                    seeTypes();
                    type.focus();
                } else {
                    showMessage(insertTypeMessage, 'Non è stato possibile inserire l\'oggetto: ' + data.message, 'insert-object-error');
                }
            }
        )
    }else {
        showMessage(insertTypeMessage, 'Inserire una descrizione', 'insert-object-error')
    }
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
    let updateTypeSelect = $('#update-type-select');
    let updateTypeInput = $('#update-type-input');

    let selectedType = updateTypeSelect.find(':selected').attr('id');
    let type = updateTypeInput.val();

    let inputTypeForm = new FormData();
    inputTypeForm.append('id', selectedType);
    inputTypeForm.append('value', type);

    if(type !== "" && type !== undefined && selectedType !== undefined) {
        let inputTypePromise = httpPost('php/ajax/update_type.php', inputTypeForm, 'POST');

        inputTypePromise.then(
            function (data) {
                if (data.result) {
                    if (data["rows"] !== 1) {
                        showMessage(updateTypeMessage, 'Non è stato possibile aggiornare la tipologia. Errore: tipologia già presente', 'insert-object-error');
                    }else {
                        updateTypeInput.val("");
                        $('#update-type-select option:eq(0)').prop('selected', true);
                        updateTypeSelect.selectmenu('refresh');
                        showMessage(updateTypeMessage, 'L\'oggetto è stato aggiornato con successo', 'insert-object-success');

                        setTimeout(function () {
                            $('#update-type-popup').popup('close');
                        }, 2000);

                        seeTypes();
                    }
                }
            }
        )
    }else{
        showMessage(updateTypeMessage, 'Seleziona una tipologia e inserisci una descrizione', 'insert-object-error');
    }
});

$('#close-update-type').on('click', function (e) {
    e.preventDefault();

    $('#update-type-popup').popup('close');
});