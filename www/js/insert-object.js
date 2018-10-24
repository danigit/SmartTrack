
$('#add-object-popup').on('click', function (e) {
    e.preventDefault();
    let insertObjectMessage = $('#insert-object-message');
    let insertObjectTypeSelect = $('#insert-object-type-select');

    let description = $('#object-field').val();
    let selectedType = insertObjectTypeSelect.find(':selected').attr('id');
    let selectedTag = $('#insert-object-tag-select').find(':selected').val();

    let inputObjectForm = new FormData();
    inputObjectForm.append('description', description);
    inputObjectForm.append('type', selectedType);
    inputObjectForm.append('tag', selectedTag);

    //controllo se e' stato selezionato un tipo e un tag
    if(selectedType === undefined || selectedTag === 'Seleziona un tag...'){
        showMessage(insertObjectMessage, 'Selezionare un tipologia e un tag', 'insert-object-error');

        setTimeout(function () {
            insertObjectMessage.empty();
            insertObjectMessage.removeClass('insert-object-error');
        }, 2000)
    }else {
        let inputObjectPromise = httpPost('php/ajax/insert_object.php', inputObjectForm, 'POST');

        inputObjectPromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    resetInput();
                    getTags($('#insert-object-tag-select'));
                    showMessage(insertObjectMessage, 'L\'oggetto e\' stato inserito con successo', 'insert-object-success');
                    seeObjects();
                } else {
                    showMessage(insertObjectMessage, data.message, 'insert-object-error');
                }
            }
        )
    }
});

function showMessage(insertObject, message, type) {
    insertObject.empty();
    insertObject.append('<p>' + message + '</p>');
    insertObject.addClass(type);

    setTimeout(function () {
        insertObject.empty();
        insertObject.removeClass(type);
    }, 2000)
}

function resetInput(){
    $('#object-field').val("");

    // $('#insert-object-type-select option:eq(0)').prop('selected', true);
    // $('#insert-object-type-select').selectmenu('refresh');
    $('#insert-object-tag-select option:eq(0)').prop('selected', true);
    $('#insert-object-tag-select').selectmenu('refresh');
}

$('#insert-object-popup-button').on('click', function () {
    getTypes($('#insert-object-type-select'));
    getTags($('#insert-object-tag-select'));
    resetInput();
    $('#insert-object-type-select option:eq(0)').prop('selected', true);
    $('#insert-object-type-select').selectmenu('refresh');
});

function getTypes(param) {
    param.children('option:not(:first)').remove();

    let getTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');
    getTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let select = '';
                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '">' + value['type'] + '</option>';
                });
                $(param).append(select);
                $(param).trigger('create');
            } else {
                showMessage($('#insert-object-message'), data.message, 'insert-object-error');
            }
        }
    );

}

function getTags(param){
    param.children('option:not(:first)').remove();

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
                showMessage($('#insert-object-message'), data.message, 'insert-object-error');
            }
        }
    );
}

function readBarCode(){
    let barcodeLength = 0;
    let fullBarcode = "";
    let parsedCode = 0;

    $('#bar-code').on('keyup', function (event) {
        barcodeLength++;
        if(barcodeLength === 10){
            fullBarcode = $('#bar-code').val();
            parsedCode = fullBarcode.substring(1, fullBarcode.length - 1);
            console.log(parsedCode);
            barcodeLength = 0;
            return parsedCode;
        }
    })
}

readBarCode();

$('#close-type').on('click', function (e) {
    e.preventDefault();
    $('#insert-type-popup').popup('close');
});

$('#close-object-popup').on('click', function (e) {
    e.preventDefault();
    $('#insert-object-popup').popup('close');
});