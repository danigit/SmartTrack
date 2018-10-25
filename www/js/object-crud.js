/**
 * Developer: Daniel Surpanu
 */

let updateObjedtDescriptionMessage = $('#update-object-description-message');
let updateObjedtTypeMessage = $('#update-object-type-message');
let updateObjedtTagMessage = $('#update-object-tag-message');

$('#update-object-description-popup-button').on('click', function () {
    $('#view-objects-ul').empty();
    $('#update-object-description-input').val("");
    $('#view-object-description-container').css('display', 'block');
    $('#view-object-description-container input').val("");
    $('#object-description-selected ul').empty();
    getDescriptionData('description');
});

$('#update-object-type-popup-button').on('click', function () {
    $('#update-object-type-select option:eq(0)').prop('selected', true);
    $('#update-object-type-select').selectmenu('refresh');

    $('#view-objects-type-ul').empty();
    $('#view-object-type-container').css('display', 'block');
    $('#view-object-type-container input').val("");
    $('#object-type-selected ul').empty();

    getTypes($('#update-object-type-select'));
    getDescriptionData('type');
});

$('#update-object-tag-popup-button').on('click', function () {
    $('#update-object-tag-select option:eq(0)').prop('selected', true);
    $('#update-object-tag-select').selectmenu('refresh');

    $('#view-objects-tag-ul').empty();
    $('#view-object-tag-container').css('display', 'block');
    $('#view-object-tag-container input').val("");
    $('#object-tag-selected ul').empty();

    getTags($('#update-object-tag-select'));
    getDescriptionData('tag');
});

function getDescriptionData(param){
    $('#view-objects-' + param + '-ul').empty();

    let getObjectssPromise = httpPost('php/ajax/get_objects.php', '', 'GET');

    getObjectssPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let list = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    list = $('<li id="' + value['id'] + '"><a href="#" class="select-object-list">' + value['name'] + '</a></li>').on('click',
                        function () {
                        $('#object-' + param + '-selected ul').append('<li class="select-object-list margin-top-15" id="' + value['id'] + '">'
                            + value['name'] + '</li>');
                        $('#object-' + param + '-selected ul').listview();
                        $('#object-' + param + '-selected ul').listview('refresh');
                        $('#view-object-' + param + '-container').css('display', 'none');
                    });
                    $('#view-objects-' + param + '-ul').append(list);
                });
                $('#view-objects-' + param + '-ul').listview();
                $('#view-objects-' + param + '-ul').listview('refresh');
                // $('#view-objects-ul').trigger('create');
            } else {
                showMessage(updateObjedtDescriptionMessage, data.message, 'input-object-error');
            }
        }
    );
}

$('#update-object-description').on('click', function () {

    let object = $('#object-description-selected ul li').attr('id');
    let description = $('#update-object-description-input').val();

    if(object !== undefined && description !== ""){
       let objectDescriptionForm = new FormData();
       objectDescriptionForm.append('id', object);
       objectDescriptionForm.append('description', description);

       let updateDescriptionPromise = httpPost('php/ajax/update_object_description.php', objectDescriptionForm, 'POST');

       updateDescriptionPromise.then(
           function (data) {
               if (data.result) {
                   if (data['rows'] !== 1) {
                       showMessage(updateObjedtDescriptionMessage, 'Non è stato possibile aggiornare l\'oggetto. Errore: nome oggetto già presente', 'insert-object-error');
                   }else{
                       showMessage(updateObjedtDescriptionMessage, 'La descrizione è stata aggiornata con successo', 'insert-object-success');
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
        showMessage(updateObjedtDescriptionMessage, 'Selezionare un oggetto e inserire una descrizione', 'insert-object-error');
    }
});


$('#update-object-type').on('click', function () {

    let object = $('#object-type-selected ul li').attr('id');
    let selectedType = $('#update-object-type-select').find(':selected').attr('id');
    let selectedText = $('#update-object-type-select').find(':selected').val();

    if(object !== undefined && selectedText !== 'Seleziona una tipologia...'){
       let objectDescriptionForm = new FormData();

       objectDescriptionForm.append('id', object);
       objectDescriptionForm.append('type', selectedType);

       let updateDescriptionPromise = httpPost('php/ajax/update_object_type.php', objectDescriptionForm, 'POST');

       updateDescriptionPromise.then(
           function (data) {
               if (data.result) {
                   showMessage(updateObjedtTypeMessage, 'La tipologia è stata aggiornata con successo', 'insert-object-success');
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
        showMessage(updateObjedtTypeMessage, 'Selezionare un oggetto e una tipologia', 'insert-object-error');
    }
});

$('#update-object-tag').on('click', function () {

    let object = $('#object-tag-selected ul li').attr('id');
    let selectedTag = $('#update-object-tag-select').find(':selected').val();

    console.log(selectedTag);
    if(object !== undefined && selectedTag !== 'Seleziona un tag...'){
       let objectDescriptionForm = new FormData();
       objectDescriptionForm.append('id', object);
       objectDescriptionForm.append('tag', selectedTag);

       let updateDescriptionPromise = httpPost('php/ajax/update_object_tag.php', objectDescriptionForm, 'POST');

       updateDescriptionPromise.then(
           function (data) {
               if (data.result) {
                   showMessage(updateObjedtTagMessage, 'Il tag è stato aggiornato con successo', 'insert-object-success');
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
        showMessage(updateObjedtTagMessage, 'Selezionare un tag e un oggetto', 'insert-object-error');
    }
});