//gestisco il click sul pulsante aggiungi oggetto
$('#add-object-popup').on('click', function (e) {
    e.preventDefault();

    let insertObjectMessage = $('#insert-object-message');
    let insertObjectTypeSelect = $('#insert-object-type-select');

    let description = $('#object-field').val();
    let selectedType = insertObjectTypeSelect.find(':selected').attr('id');
    let selectedTag = $('#insert-object-tag-select').find(':selected').attr('id');

    let inputObjectForm = new FormData();
    inputObjectForm.append('description', description);
    inputObjectForm.append('type', selectedType);
    inputObjectForm.append('tag', selectedTag);

    //controllo se e' stato selezionato un tipo e un tag
    if(selectedType === 'lan-insert-object-insert-object-type-option' || selectedTag === 'lan-insert-object-insert-object-tag-option' || description === ""){
        showMessage(insertObjectMessage, language['insert-object-select-type-error'], 'insert-object-error');

        setTimeout(function () {
            insertObjectMessage.empty();
            insertObjectMessage.removeClass('insert-object-error');
        }, 2000)
    }else {
        //invio richiesta xmlhttp
        let inputObjectPromise = httpPost('php/ajax/insert_object.php', inputObjectForm, 'POST');

        //interpreto risposta
        inputObjectPromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    resetInput();
                    getTags($('#insert-object-tag-select'));
                    showMessage(insertObjectMessage, language['object-inserted-successfull'], 'insert-object-success');
                    seeObjects();
                } else {
                    showMessage(insertObjectMessage, data.message, 'insert-object-error');
                }
            }
        )
    }
});

/**
 * Funzione che resetta l'input dell'inserimento dell'oggetto
 */
function resetInput(){
    $('#object-field').val("");

    $('#insert-object-tag-select option:eq(0)').prop('selected', true);
    $('#insert-object-tag-select').selectmenu('refresh');
}

//gestisco il click sul pulsante di inserimento oggetto del popup
$('#insert-object-popup-button').on('click', function () {
    let insertObjectTupeSelect = $('#insert-object-type-select');
    getTypes(insertObjectTupeSelect);
    getTags($('#insert-object-tag-select'));
    resetInput();
    $('#insert-object-type-select option:eq(0)').prop('selected', true);
    insertObjectTupeSelect.selectmenu('refresh');
});

/**
 * Funzione che ritorna tutti i tipi
 * @param param - options da eliminare per inserire le nuove
 */
function getTypes(param) {
    param.children('option:not(:first)').remove();

    //invio richiesta xmlhttp
    let getTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    //interpreto risposta
    getTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '">' + value['type'] + '</option>';
                });
                $(param).append(select).trigger('create');
            } else {
                showMessage($('#insert-object-message'), data.message, 'insert-object-error');
            }
        }
    );

}

/**
 * Funzione che recupera tutti i tag
 * @param param - tag da eliminare per inserire i nuovi
 */
function getTags(param){
    param.children('option:not(:first)').remove();

    //invio la richiesta xmlhttp
    let getTagPromise = httpPost('php/ajax/get_tags.php', '', 'GET');

    //interpreto la risposta
    getTagPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '">' + value['mac'] + '</option>';
                });
                $(param).append(select).trigger('create');
            } else {
                showMessage($('#insert-object-message'), data.message, 'insert-object-error');
            }
        }
    );
}

//gestisco il click sul pulsante di chiusura del popup
$('#close-type').on('click', function (e) {
    e.preventDefault();
    $('#insert-type-popup').popup('close');
});

//gestisco il click di chiusura del popoup
$('#close-object-popup').on('click', function (e) {
    e.preventDefault();
    $('#insert-object-popup').popup('close');
});