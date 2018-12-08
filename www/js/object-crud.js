/**
 * Developer: Daniel Surpanu
 */

let updateObjedtDescriptionMessage = $('#update-object-description-message');
let updateObjedtTypeMessage = $('#update-object-type-message');
let updateObjedtTagMessage = $('#update-object-tag-message');

//gestisco il click sul pulsante di cambiamento descizione di un oggetto
$('#update-object-description-popup-button').on('click', function () {
    $('#view-objects-ul').empty();
    $('#update-object-description-input').val("");
    $('#view-object-description-container').css('display', 'block');
    $('#view-object-description-container input').val("");
    $('#object-description-selected ul').empty();
    getDescriptionData('description');
});

//gestistco il click sul pulsante di aggiornamento della tipologia di un oggetto
$('#update-object-type-popup-button').on('click', function () {
    let updateObjectTypeSelect = $('#update-object-type-select');
    $('#update-object-type-select option:eq(0)').prop('selected', true);
    updateObjectTypeSelect.selectmenu('refresh');

    $('#view-objects-type-ul').empty();
    $('#view-object-type-container').css('display', 'block');
    $('#view-object-type-container input').val("");
    $('#object-type-selected ul').empty();

    getTypes(updateObjectTypeSelect);
    getDescriptionData('type');
});

//gestisco il click sul pulsante di aggiornamento del tag di un oggetto
$('#update-object-tag-popup-button').on('click', function () {
    let updateObjectTagSelect = $('#update-object-tag-select');
    $('#update-object-tag-select option:eq(0)').prop('selected', true);
    updateObjectTagSelect.selectmenu('refresh');

    $('#view-objects-tag-ul').empty();
    $('#view-object-tag-container').css('display', 'block');
    $('#view-object-tag-container input').val("");
    $('#object-tag-selected ul').empty();

    getTags(updateObjectTagSelect);
    getDescriptionData('tag');
});

/**
 * Funzione che recupera e gestisce la selezione deglio oggetti nell'aggioranmento del tag
 * @param param
 */
function getDescriptionData(param){
    $('#view-objects-' + param + '-ul').empty();

    //ivnvio richiesta xmlhttp
    let getObjectssPromise = httpPost('php/ajax/get_objects.php', '', 'GET');

    //interpreto la risposta
    getObjectssPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let list = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    list = $('<li id="' + value['id'] + '"><a href="#" class="select-object-list">' + value['name'] + '</a></li>').on('click',
                        function () {
                        let objectParamSelected = $('#object-' + param + '-selected ul');
                        objectParamSelected.append('<li class="select-object-list margin-top-15" id="' + value['id'] + '">'
                            + value['name'] + '</li>');
                        objectParamSelected.listview().listview('refresh');
                        $('#view-object-' + param + '-container').css('display', 'none');
                    });
                    $('#view-objects-' + param + '-ul').append(list);
                });

                let viewObjectsParamUl = $('#view-objects-' + param + '-ul');
                viewObjectsParamUl.listview().listview('refresh');
            } else {
                showMessage(updateObjedtDescriptionMessage, data.message, 'input-object-error');
            }
        }
    );
}

//gestisco il click sul pulsante di aggiornamento della descrizione dell'oggetto
$('#update-object-description').on('click', function () {

    let object = $('#object-description-selected ul li').attr('id');
    let description = $('#update-object-description-input').val();

    if(object !== undefined && description !== ""){
        //recupero gli oggetti da spedire
        let objectDescriptionForm = new FormData();
        objectDescriptionForm.append('id', object);
        objectDescriptionForm.append('description', description);

        //invio richiesta xmlhttp
        let updateDescriptionPromise = httpPost('php/ajax/update_object_description.php', objectDescriptionForm, 'POST');

        //interpreto risposta
        updateDescriptionPromise.then(
            function (data) {
                //controllo se ci sono stati errori nella risposta
                if (data.result) {
                    if (data['rows'] !== 1) {
                        showMessage(updateObjedtDescriptionMessage, language['lan-update-object-error'], 'insert-object-error');
                    }else{
                        showMessage(updateObjedtDescriptionMessage, language['lan-update-object-success'], 'insert-object-success');
                        setTimeout(function () {
                            $('#update-object-description-popup').popup('close');
                        }, 2000);
                        seeObjects();
                    }
                }else {
                     showMessage(updateObjedtDescriptionMessage, data.message, 'insert-object-error');
                }
            }
       )
    }else {
        showMessage(updateObjedtDescriptionMessage, language['lan-insert-object-empty-field-error'], 'insert-object-error');
    }
});

//gestisco il click sul pulsante di aggiornamento della tipologia dell'oggetto
$('#update-object-type').on('click', function () {

    let object = $('#object-type-selected ul li').attr('id');
    let selectedType = $('#update-object-type-select').find(':selected').attr('id');
    // let selectedText = $('#update-object-type-select').find(':selected').val();

    if(object !== undefined && selectedType !== 'lan-insert-object-update-object-type-option'){
        //recupero i dati da inviare
        let objectDescriptionForm = new FormData();

        objectDescriptionForm.append('id', object);
        objectDescriptionForm.append('type', selectedType);

        //invio dati xmlhttp
        let updateDescriptionPromise = httpPost('php/ajax/update_object_type.php', objectDescriptionForm, 'POST');

        //interpreto risposta
        updateDescriptionPromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    showMessage(updateObjedtTypeMessage, language['lan-update-object-type-success'], 'insert-object-success');
                    setTimeout(function () {
                        $('#update-object-type-popup').popup('close');
                    }, 2000);

                    seeObjects();
                }else {
                    showMessage(updateObjedtTypeMessage, data.message, 'insert-object-error');
                }
            }
        )
    }else {
        showMessage(updateObjedtTypeMessage, language['lan-insert-object-emtpy-field-type-error'], 'insert-object-error');
    }
});

//gestisco il click sul pulsate di aggiornamento tag
$('#update-object-tag').on('click', function () {

    let object = $('#object-tag-selected ul li').attr('id');
    let selectedTag = $('#update-object-tag-select').find(':selected').attr('id');

    if(object !== undefined && selectedTag !== 'lan-insert-object-update-object-tag-option'){

        //recupero i dati da inviare
        let objectDescriptionForm = new FormData();
        objectDescriptionForm.append('id', object);
        objectDescriptionForm.append('tag', selectedTag);

        //invio richiesta xmlhttp
        let updateDescriptionPromise = httpPost('php/ajax/update_object_tag.php', objectDescriptionForm, 'POST');

        //interpreto risposta
        updateDescriptionPromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella risposta
                if (data.result) {
                    showMessage(updateObjedtTagMessage, language['lan-insert-object-update-tag-success'], 'insert-object-success');
                    setTimeout(function () {
                        $('#update-object-tag-popup').popup('close');
                    }, 2000);

                    seeObjects();
                }else {
                    showMessage(updateObjedtTagMessage, data.message, 'insert-object-error');
                }
            }
        )
   }else {
        showMessage(updateObjedtTagMessage, language['lan-insert-object-update-tag-error'], 'insert-object-error');
    }
});