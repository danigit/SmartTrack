/**
 * Funzione che crea un nuovo kit
 */

let templateSelection = $('#see-kit-template-select');
let typesSelectFromTemplate = $('#type-select-from-template');
let typeListUlFromTemplate = $('#type-list-ul-from-template');
let objectListUlFromTemplate = $('#object-list-ul-from-template');
let errorMsgCreateKitFromTemplate = $('#error-msg-create-kit-from-template');
let typesCount = {};
let isKitComplete = false;
let typeTrace = 0;

/**
 * Funzione che crea un kit da template
 */
function createKitFromTemplate() {

    typeListUlFromTemplate.empty();
    $('#type-select-from-template option:eq(0)').prop('selected', true);
    typesSelectFromTemplate.selectmenu('refresh');
    $('#type-select-from-template-fieldset').addClass('ui-disabled');
    typeListUlFromTemplate.empty();

    templateSelection.find('option').not(':first').remove();
    getKits(templateSelection);

    $('#see-kit-template-select option:eq(0)').prop('selected', true);
    templateSelection.selectmenu('refresh');

    $('#type-count-container p').empty();

    let selectedType;

    //invio richiesta xmlhttp
    let getTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    //interpreto risposta
    getTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $(typesSelectFromTemplate).children('option:not(:first)').remove();

                let select = '';

                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '" class="center-text">' + value['type'] + '</option>';
                });

                typesSelectFromTemplate.append(select);
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');

                if ($('.error-message').length !== 0)
                    errorMsgCreateKitFromTemplate.find('.error-message').remove();
                errorMsgCreateKitFromTemplate.append(message);
            }
        }
    );

    //gestisco il cambio della selezione delle tipologie e l'inserimeto degli oggetti nella lista degli oggeti disponibili
    typesSelectFromTemplate.on('change', function () {
        selectedType = typesSelectFromTemplate.find(':selected').attr('id');

        //recupero i dati da inviare
        let getObjectsForm = new FormData();
        getObjectsForm.append('type', selectedType);

        //invio richiesta xmlhttp
        let getObjectsPromise = httpPost('php/ajax/get_objects_by_type.php', getObjectsForm, 'POST');

        //interpreto risposta
        getObjectsPromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    //svuoto la lista delle tipologie
                    typeListUlFromTemplate.empty();

                    $.each(data[0], function (key, value) {
                        typeListUlFromTemplate.append(insertRowFromTemplate(key, value));
                    });

                    typeListUlFromTemplate.listview('refresh');
                }else{
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');

                    if ($('.error-message').length !== 0)
                        errorMsgCreateKitFromTemplate.find('.error-message').remove();
                    errorMsgCreateKitFromTemplate.append(message);
                }
            }
        )
    });

}

//gestisco il cambio del template
templateSelection.on('change', function () {
    $('#type-count-container p').empty();
    $('#type-select-from-template-fieldset').removeClass('ui-disabled');
    let selectedTemplate = templateSelection.find(':selected').attr('id');

    //racolgo i dati da inviare
    let kitTemplateForm = new FormData();
    kitTemplateForm.append('id', selectedTemplate);

    //invio richiesta xmlhttp
    let kitTemplatePromise = httpPost('php/ajax/get_template_info.php', kitTemplateForm, 'POST');

    //interpreto risposta
    kitTemplatePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $.each(data[0], function (key, value) {
                    typesCount[key] = {type: value['type'], number: value['number']};
                });
                $('#type-count-container p').append(language['insert-create-from-template'] + ' <b class="">' + typesCount[typeTrace].number + '</b> ' + language['objects-create-from-template'] + ' <b class="">'+ typesCount[typeTrace].type + '</b>');
            }
        }
    )
});

/**
 * Funzione che inserisce un nuovo oggetto nella lista disponibili
 * @param key
 * @param value
 * @returns {jQuery.fn.init|jQuery|HTMLElement}
 */
function insertRowFromTemplate(key, value) {
    let isInKit = false;
    let list = null;

    $.each(objectListUlFromTemplate.children(), function (innerKey, innerValue) {
        if (innerValue.firstChild.textContent === value['name'])
            isInKit = true;
    });

    if(!isInKit) {
        list = $('<li class="margin-bottom-5"></li>');

        //creo il pulsante per aggiungere l'oggetto alla lista degli oggetti presenti nel kit
        let button = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-greenbtn border-green-1 border-radius-10">Aggiungi al kit</a>').on('click', function () {
            let cod = $(this).attr('id');
            let isPresent = false;

            $(this).parent().remove();

            //controllo se l'oggetto e' gia' presente nella lista
            $.each($('#object-list-ul-from-template').children(), function (key, value) {
                if ($(value).attr('id') === cod)
                    isPresent = true;
            });

            //se l'oggetto e' gia' presente non lo inserisco piu'
            if (!isPresent) {
                let objectList = $('<li id="' + cod + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 border-radius-10 margin-right-42">' + value['name'] + '</a></li>');

                //creo il pulsante per eliminare l'oggetto dalla lista degli oggetti presenti nel kit e aggiungerlo
                //nella lista degli oggetti disponibili
                let deleteElem = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus border-red-1 border-radius-10">Elimina dal kit</a>').on('click', function () {
                    $(this).parent().remove();
                    console.log(value['name']);
                    typeListUlFromTemplate.append(insertRow(key, value));
                    typeListUlFromTemplate.listview('refresh');
                });

                objectList.append(deleteElem);
                objectListUlFromTemplate.append(objectList);
                objectListUlFromTemplate.listview('refresh');
                $('#create-kit-submit-from-template').parent().removeClass('ui-disabled');
                $('#create-kit-suspend-from-template').parent().removeClass('ui-disabled');

                typesCount[typeTrace].number = typesCount[typeTrace].number - 1;
                console.log(Object.keys(typesCount).length);
                if (typesCount[typeTrace].number === 0 && typeTrace < Object.keys(typesCount).length - 1)
                    typeTrace++;

                let typeCountContainerP = $('#type-count-container p');
                if(isKitComplete === false) {
                    typeCountContainerP.text("");
                    typeCountContainerP.append(language['insert-create-from-template'] + '<b class="">' + typesCount[typeTrace].number + '</b> ' + language['objects-create-from-template'] + ' <b class="">' + typesCount[typeTrace].type + '</b>');
                }

                if (typesCount[typeTrace].number === 0 && typeTrace === Object.keys(typesCount).length - 1){
                    isKitComplete = true;
                    typeCountContainerP.text("Il kit e' completo");
                    typeCountContainerP.removeClass("red-color");
                    typeCountContainerP.addClass("green-color");
                }
            } else {
                showError($('#error-popup-from-template'), language['impossible-add-element'], language['element-already-in'], "error");
            }
        });

        list.append('<a href="#" class="border-orange-1 border-radius-10 margin-right-42">' + value['name'] + '</a>');
        list.append(button);
    }
    return list;
}

//gestisco il click sul pulsante di creazione kit
$('#create-kit-submit-from-template').on('click', function () {
    let createKitForm = new FormData();
    let count  = 0;
    let descriptionFromTemplate = $('#description-from-template');
    //controllo se il kit ha una descrizione
    if(descriptionFromTemplate.val() === ""){

        $('html, body').animate({scrollTop: $(document).height()}, 1000);
        $('#create-kit-fielset-from-template input').css('border-bottom', '1px solid #E52612');

        let message = $('<div class="error-message float-left"><span class="float-left">' + language['lan-insert-description'] + '</span><img src="../GESTIONALEMAGAZZINO/img/alert-icon.png" class="margin-l-5 float-left insert-description-error-image"></div>');

        if ($('.error-message').length !== 0)
            errorMsgCreateKitFromTemplate.find('.error-message').remove();
        errorMsgCreateKitFromTemplate.append(message);
    }else {
        //aggiungo tutti i dati da inviare al server
        $.each(objectListUlFromTemplate.children(), function (key, value) {
            let obj = $(value).attr('id');

            createKitForm.append(key, obj);
            count++;
        });

        createKitForm.append('count', "" + count);
        createKitForm.append('description', descriptionFromTemplate.val());

        //invio richiesta xmlhttp
        let createKitPromise = httpPost('php/ajax/create_kit.php', createKitForm, 'POST');

        //interpreto risposta
        createKitPromise.then(
            function (data) {
                //controllo se ci sono stati dei errori nella chiamata
                if (data.result) {
                    showError($('#error-popup-from-template'), language['kit-create-successfull-title'], language['kit-create-successfull-content'], 'success');
                    setTimeout(function () {
                        document.location.href = 'content.php';
                    }, 1500);
                }else {
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');

                    if ($('.error-message').length !== 0)
                        errorMsgCreateKitFromTemplate.find('.error-message').remove();

                    errorMsgCreateKitFromTemplate.append(message);
                }
            }
        )
    }
});

//gestisco il click sul pulsante di sospensione della creazione del kit
$('#create-kit-suspend-from-template').on('click', function () {
    let suspendKitForm = new FormData();
    let count  = 0;

    //aggiungo tutti i dati da inviare al server
    $.each(objectListUlFromTemplate.children(), function (key, value) {
        let obj = $(value).attr('id');
        console.log(obj);
        suspendKitForm.append(key, obj);
        count++;
    });

    suspendKitForm.append('count', "" + count);

    //invio richiesta xmlhttp
    let createKitPromise = httpPost('php/ajax/suspend_kit.php', suspendKitForm, 'POST');

    //interpreto risposta
    createKitPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                showError($('#error-popup-from-template'), 'Kit sospeso', 'Il kit e\' stato sospeso con successo', 'success');
                setTimeout(function (){
                    document.location.href = 'content.php';
                }, 1500);
            }else{
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    errorMsgCreateKitFromTemplate.find('.error-message').remove();
                errorMsgCreateKitFromTemplate.append(message);
            }
        }
    )
});