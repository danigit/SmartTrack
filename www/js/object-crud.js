$('#update-object-description-popup-button').on('click', function () {
    $('#view-objects-ul').empty();
    $('#update-object-description-input').val("");
    $('#view-object-description-container').css('display', 'block');
    $('#object-description-selected ul').empty();
    getDescriptionData('description');
});

$('#update-object-type-popup-button').on('click', function () {
//     $('#view-objects-ul').empty();
//     $('#update-object-' + param + '-input').val("");
//     $('#view-object-' + param + '-container').css('display', 'block');
//     $('#object-' + param + '-selected ul').empty();
    getTypes($('#update-object-type-select'));
    getDescriptionData('type');
});

$('#update-object-tag-popup-button').on('click', function () {
//     $('#view-objects-ul').empty();
//     $('#update-object-' + param + '-input').val("");
//     $('#view-object-' + param + '-container').css('display', 'block');
//     $('#object-' + param + '-selected ul').empty();
    getTags($('#update-object-tag-select'));
    getDescriptionData('tag');
});

function getDescriptionData(param){

    let getObjectssPromise = httpPost('php/ajax/get_objects.php', '', 'GET');

    console.log('getting types update');
    getObjectssPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let list = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    list = $('<li class="select-object-list" id="' + value['id'] + '">' + value['name'] + '</li>').on('click', function () {
                        console.log('object clicked');
                        $('#object-' + param + '-selected ul').append('<li class="select-object-list margin-top-50" id="' + value['id'] + '">' + value['name'] + '</li>');
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
                //TODO messaggio errore
            }
        }
    );
}

$('#update-object-description').on('click', function () {

    let object = $('#object-description-selected ul li').attr('id');
    let description = $('#update-object-description-input').val();

    if(object !== undefined){
       let objectDescriptionForm = new FormData();
       objectDescriptionForm.append('id', object);
       objectDescriptionForm.append('description', description);

       let updateDescriptionPromise = httpPost('php/ajax/update_object_description.php', objectDescriptionForm, 'POST');

       updateDescriptionPromise.then(
           function (data) {
               if (data.result) {
                   $('#update-object-description-message').empty();
                   $('#update-object-description-message').append('<p>L\'oggetto e\' stato inserito con successo</p>');
                   $('#update-object-description-message').addClass('insert-object-success');
                   setTimeout(function () {
                       $('#update-object-description-message').empty();
                       $('#iupdate-object-description-message').removeClass('insert-object-success');
                       $('#update-object-description-popup').popup('close');
                   }, 2000)

                   seeObjects();
               }else {

                   $('#update-object-description-message').empty();
                   $('#update-object-description-message').append('<p>' + data.message + '</p>');
                   $('#update-object-description-message').addClass('insert-object-error');
                   setTimeout(function () {
                       $('#update-object-description-message').empty();
                       $('#update-object-description-message').removeClass('insert-object-error');
                   }, 2000)
               }
           }
       )
   }else {
        $('#update-object-description-message').empty();
        $('#update-object-description-message').append('<p>Selezionare un oggetto</p>');
        $('#update-object-description-message').addClass('insert-object-error');
        setTimeout(function () {
            $('#update-object-description-message').empty();
            $('#update-object-description-message').removeClass('insert-object-error');
        }, 2000)
    }
});

$('#update-object-type').on('click', function () {

    let object = $('#object-type-selected ul li').attr('id');
    let selectedType = $('#update-object-type-select').find(':selected').attr('id');


    if(object !== undefined){
       let objectDescriptionForm = new FormData();
       objectDescriptionForm.append('id', object);
       objectDescriptionForm.append('type', selectedType);

       let updateDescriptionPromise = httpPost('php/ajax/update_object_type.php', objectDescriptionForm, 'POST');

       updateDescriptionPromise.then(
           function (data) {
               if (data.result) {
                   $('#update-object-type-message').empty();
                   $('#update-object-type-message').append('<p>L\'oggetto e\' stato aggiornato con successo</p>');
                   $('#update-object-type-message').addClass('insert-object-success');
                   setTimeout(function () {
                       $('#update-object-type-message').empty();
                       $('#iupdate-object-type-message').removeClass('insert-object-success');
                       $('#update-object-type-popup').popup('close');
                   }, 2000)

                   seeObjects();
               }else {

                   $('#update-object-type-message').empty();
                   $('#update-object-type-message').append('<p>' + data.message + '</p>');
                   $('#update-object-type-message').addClass('insert-object-error');
                   setTimeout(function () {
                       $('#update-object-type-message').empty();
                       $('#update-object-type-message').removeClass('insert-object-error');
                   }, 2000)
               }
           }
       )
   }else {
        $('#update-object-type-message').empty();
        $('#update-object-type-message').append('<p>Selezionare un oggetto</p>');
        $('#update-object-type-message').addClass('insert-object-error');
        setTimeout(function () {
            $('#update-object-type-message').empty();
            $('#update-object-type-message').removeClass('insert-object-error');
        }, 2000)
    }
});

$('#update-object-tag').on('click', function () {

    let object = $('#object-tag-selected ul li').attr('id');
    let selectedTag = $('#update-object-tag-select').find(':selected').val();


    if(object !== undefined){
       let objectDescriptionForm = new FormData();
       objectDescriptionForm.append('id', object);
       objectDescriptionForm.append('tag', selectedTag);

       let updateDescriptionPromise = httpPost('php/ajax/update_object_tag.php', objectDescriptionForm, 'POST');

       updateDescriptionPromise.then(
           function (data) {
               if (data.result) {
                   $('#update-object-tag-message').empty();
                   $('#update-object-tag-message').append('<p>L\'oggetto e\' stato aggiornato con successo</p>');
                   $('#update-object-tag-message').addClass('insert-object-success');
                   setTimeout(function () {
                       $('#update-object-tag-message').empty();
                       $('#iupdate-object-tag-message').removeClass('insert-object-success');
                       $('#update-object-tag-popup').popup('close');
                   }, 2000)

                   seeObjects();
               }else {

                   $('#update-object-tag-message').empty();
                   $('#update-object-tag-message').append('<p>' + data.message + '</p>');
                   $('#update-object-tag-message').addClass('insert-object-error');
                   setTimeout(function () {
                       $('#update-object-tag-message').empty();
                       $('#update-object-tag-message').removeClass('insert-object-error');
                   }, 2000)
               }
           }
       )
   }else {
        $('#update-object-tag-message').empty();
        $('#update-object-tag-message').append('<p>Selezionare un tag</p>');
        $('#update-object-tag-message').addClass('insert-object-error');
        setTimeout(function () {
            $('#update-object-tag-message').empty();
            $('#update-object-tag-message').removeClass('insert-object-error');
        }, 2000)
    }
});