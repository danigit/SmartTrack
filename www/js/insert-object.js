
$('#add-object-popup').on('click', function (e) {
    e.preventDefault();

    let description = $('#object-field').val();
    let selectedType = $('#insert-object-type-select').find(':selected').attr('id');
    let selectedTag = $('#insert-object-tag-select').find(':selected').val();
    console.log(description + selectedTag + selectedType);

    let inputObjectForm = new FormData();
    inputObjectForm.append('description', description);
    inputObjectForm.append('type', selectedType);
    inputObjectForm.append('tag', selectedTag);

    if(selectedType === undefined || selectedTag === undefined){
        $('#insert-object-message').empty();
        $('#insert-object-message').append('<p>Selezionare una tipologia e un tag</p>');
        $('#insert-object-message').addClass('insert-object-error');
        setTimeout(function () {
            $('#insert-object-message').empty();
            $('#insert-object-message').removeClass('insert-object-error');
        }, 2000)
    }else {
        let inputObjectPromise = httpPost('php/ajax/insert_object.php', inputObjectForm, 'POST');

        inputObjectPromise.then(
            function (data) {
                if (data.result) {
                    $('#object-field').val("");
                    $('#insert-object-type-select option:eq(0)').prop('selected', true);
                    $('#insert-object-type-select').selectmenu('refresh');
                    $('#insert-object-tag-select option:eq(0)').prop('selected', true);
                    $('#insert-object-tag-select').selectmenu('refresh');
                    $('#insert-object-message').empty();
                    $('#insert-object-message').append('<p>L\'oggetto e\' stato inserito con successo</p>');
                    $('#insert-object-message').addClass('insert-object-success');
                    setTimeout(function () {
                        $('#insert-object-message').empty();
                        $('#insert-object-message').removeClass('insert-object-success');
                    }, 2000)

                    seeObjects();
                } else {
                    $('#insert-object-message').empty();
                    $('#insert-object-message').append('<p>' + data.message + '</p>');
                    $('#insert-object-message').addClass('insert-object-error');
                    setTimeout(function () {
                        $('#insert-object-message').empty();
                        $('#insert-object-message').removeClass('insert-object-error');
                    }, 2000)
                }
            }
        )
    }
});

$('#insert-object-popup-button').on('click', function () {
    getTypes($('#insert-object-type-select'));
    getTags($('#insert-object-tag-select'));
    getDataInsert();
});

function getTypes(param) {
    let getTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');
    getTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '">' + value['type'] + '</option>';
                });;
                $(param).append(select);
                $(param).trigger('create');
            } else {
                //TODO messaggio errore
            }
        }
    );

}

function getTags(param){
    let getTagPromise = httpPost('php/ajax/get_tags.php', '', 'GET');

    getTagPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '">' + value['mac'] + '</option>';
                });
                $(param).append(select);
                $(param).trigger('create');
            } else {
                //TODO messaggio errore
            }
        }
    );
}

function getDataInsert(){
    $('#insert-object-type-select').children('option:not(:first)').remove();
    $('#insert-object-tag-select').children('option:not(:first)').remove();
}
//
// function getDataUpdate(){
//     $('#update-object-type-select').children('option:not(:first)').remove();
//     $('#update-object-tag-select').children('option:not(:first)').remove();
//
//     let getTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');
//     let getTagPromise = httpPost('php/ajax/get_tags.php', '', 'GET');
//
//     console.log('getting types update');
//     getTypesPromise.then(
//         function (data) {
//             //controllo se ci sono stati degli errori nella chiamata
//             if (data.result) {
//                 let select = '';
//                 //inserisco le tipologie nella select
//                 $.each(data[0], function (key, value) {
//                     select += '<option id="' + value['id'] + '">' + value['type'] + '</option>';
//                 });
//                 $('#update-object-type-select').append(select);
//                 $('#update-object-type-select').trigger('create');
//             } else {
//                 //TODO messaggio errore
//             }
//         }
//     );
//
//     getTagPromise.then(
//         function (data) {
//             //controllo se ci sono stati degli errori nella chiamata
//             if (data.result) {
//                 let select = '';
//                 //inserisco le tipologie nella select
//                 $.each(data[0], function (key, value) {
//                     select += '<option id="' + value['id'] + '">' + value['mac'] + '</option>';
//                 });
//                 $('#update-object-tag-select').append(select);
//                 $('#update-object-tag-select').trigger('create');
//             } else {
//                 //TODO messaggio errore
//             }
//         }
//     );
// }

$('#close-type').on('click', function (e) {
    e.preventDefault();
    $('#insert-type-popup').popup('close');
});