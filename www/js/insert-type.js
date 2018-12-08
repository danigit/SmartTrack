/**
 * Developer: Daniel Surpanu
 */


//gestisco il click sul pulsante di aggiunta tipologia
$('#add-type').on('click', function (e) {
    e.preventDefault();
    let type = $('#type');
    let insertTypeMessage = $('#insert-type-message');

    if(type.val() !== "") {
        //recupero i dati
        let inputTypeForm = new FormData();
        inputTypeForm.append('type', type.val());

        //invio richiesta xmlhttp
        let inputTypePromise = httpPost('php/ajax/insert_type.php', inputTypeForm, 'POST');

        //interpreto risposta
        inputTypePromise.then(
            function (data) {
                //constrollo se ci sono stati degli errori nella risposta
                if (data.result) {
                    type.val("");
                    showMessage(insertTypeMessage, language['lan-insert-type-success'], 'insert-object-success');
                    seeTypes();
                    type.focus();
                } else {
                    showMessage(insertTypeMessage, language['lan-insert-type-error'] + data.message, 'insert-object-error');
                }
            }
        )
    }else {
        showMessage(insertTypeMessage, language['lan-insert-description'], 'insert-object-error')
    }
});

//gesticso il click sul pulsante di aggiornamento della tipologia del popup
$('#update-type-popup-button').on('click', function () {
    let updateTypeSelect = $('#update-type-select');
    getTypes(updateTypeSelect);

    $('#update-type-input').val("");

    $('#update-type-select option:eq(0)').prop('selected', true);
    updateTypeSelect.selectmenu('refresh');
});

//gestisco il click sul pulsante di aggiornametnto della tipologia
$('#update-type').on('click', function (e) {
    e.preventDefault();

    let updateTypeMessage = $('#update-type-message');
    let updateTypeSelect = $('#update-type-select');
    let updateTypeInput = $('#update-type-input');

    let selectedType = updateTypeSelect.find(':selected').attr('id');
    let type = updateTypeInput.val();

    //reccupero dati da inviare
    let inputTypeForm = new FormData();
    inputTypeForm.append('id', selectedType);
    inputTypeForm.append('value', type);

    if(type !== "" && type !== undefined && selectedType !== 'lan-insert-type-select-type-popup') {
        //invio richiesta xmlhttp
        let inputTypePromise = httpPost('php/ajax/update_type.php', inputTypeForm, 'POST');

        //interpreto risposta
        inputTypePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori
                if (data.result) {
                    if (data["rows"] !== 1) {
                        showMessage(updateTypeMessage, language['lan-update-type-error'], 'insert-object-error');
                    }else {
                        updateTypeInput.val("");
                        $('#update-type-select option:eq(0)').prop('selected', true);
                        updateTypeSelect.selectmenu('refresh');
                        showMessage(updateTypeMessage, language['lan-update-type-success'], 'insert-object-success');

                        setTimeout(function () {
                            $('#update-type-popup').popup('close');
                        }, 2000);

                        seeTypes();
                    }
                }
            }
        )
    }else{
        showMessage(updateTypeMessage, language['lan-insert-type-empty-field-error'], 'insert-object-error');
    }
});

//gestiso il click sulla chiusura del popup di aggiornamento tipologia
$('#close-update-type').on('click', function (e) {
    e.preventDefault();

    $('#update-type-popup').popup('close');
});