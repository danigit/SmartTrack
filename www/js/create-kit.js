/**
 * Funzione che crea un nuovo kit
 */

let typesSelect = $('#type-select');
let typeListUl = $('#type-list-ul');
let objectListUl = $('#object-list-ul');
let errorMsgCreateKit = $('#error-msg-create-kit');

/**
 * Funzione che crea un nuovo kit
 */
function createKit() {

    //invio richiesta xmlhttp
    let getTypesPromise = httpPost('php/ajax/get_types.php', '', 'GET');

    //interpreto la risposta
    getTypesPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                $('#type-select option:eq(0)').prop('selected', true);
                $('#type-select').selectmenu('refresh');
                typeListUl.empty();
                $(typesSelect).children('option:not(:first)').remove();

                let select = '';

                //inserisco le tipologie nella select
                $.each(data[0], function (key, value) {
                    select += '<option id="' + value['id'] + '" class="center-text">' + value['type'] + '</option>';
                });

                typesSelect.append(select);
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');

                if ($('.error-message').length !== 0)
                    errorMsgCreateKit.find('.error-message').remove();
                errorMsgCreateKit.append(message);
            }
        }
    );
}

//gestisco il cambio della selezione delle tipologie e l'inserimeto degli oggetti nella lista degli oggeti disponibili
typesSelect.on('change', function () {
    let selectedType = typesSelect.find(':selected').attr('id');

    //recupero dati da inviare
    let getObjectsForm = new FormData();
    getObjectsForm.append('type', selectedType);

    //invio richiesta xmlhttp
    let getObjectsPromise = httpPost('php/ajax/get_objects_by_type.php', getObjectsForm, 'POST');

    //interpreto la risposta
    getObjectsPromise.then(
        function (data) {
            //controllo se ci sono errori nella risposta
            if (data.result) {
                //svuoto la lista delle tipologie
                typeListUl.empty();

                $.each(data[0], function (key, value) {
                    typeListUl.append(insertRow(key, value));
                });

                typeListUl.listview('refresh');
            }else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');

                if ($('.error-message').length !== 0)
                    errorMsgCreateKit.find('.error-message').remove();
                errorMsgCreateKit.append(message);
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
function insertRow(key, value) {
    let isInKit = false, list = null;

    $.each(objectListUl.children(), function (innerKey, innerValue) {
        if (innerValue.firstChild.textContent === value['name'])
            isInKit = true;
    });

    if(!isInKit) {
        list = $('<li class="margin-bottom-5"></li>');

        //creo il pulsante per aggiungere l'oggetto alla lista degli oggetti presenti nel kit
        let button = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-greenbtn border-green-1 ' +
            'border-radius-10">Aggiungi al kit</a>').on('click', function () {
            let cod = $(this).attr('id');
            let isPresent = false;

            $(this).parent().remove();

            //controllo se l'oggetto e' gia' presente nella lista
            $.each($('#object-list-ul').children(), function (key, value) {
                if ($(value).attr('id') === cod)
                    isPresent = true;
            });

            //se l'oggetto e' gia' presente non lo inserisco piu'
            if (!isPresent) {
                let objectList = $('<li id="' + cod + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 ' +
                    'border-radius-10 margin-right-42">' + value['name'] + '</a></li>');

                //creo il pulsante per eliminare l'oggetto dalla lista degli oggetti presenti nel kit e aggiungerlo
                //nella lista degli oggetti disponibili
                let deleteElem = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus ' +
                    'border-red-1 border-radius-10">Elimina dal kit</a>').on('click', function () {
                    $(this).parent().remove();
                    typeListUl.append(insertRow(key, value));
                    typeListUl.listview('refresh');
                });

                objectList.append(deleteElem);
                objectListUl.append(objectList);
                objectListUl.listview('refresh');
                $('#create-kit-submit').parent().removeClass('ui-disabled');
                $('#create-kit-suspend').parent().removeClass('ui-disabled');
            } else {
                showError($('#error-popup'), language['impossible-add-elem-already-on'], language['element-already-in'], "error");
            }
        });

        list.append('<a href="#" class="border-orange-1 border-radius-10 margin-right-42">' + value['name'] + '</a>');
        list.append(button);
    }
    return list;
}

/**
 * Funzione che controlla se c'e' un kit da recuperare e lo recupera
 */
function controlRecoverKit() {

    //invio richiesta xmlhttp
    let controlRecoverKitPromise = httpPost('php/ajax/control_recover_kit.php', '', 'GET');

    //interpreto risposta
    controlRecoverKitPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#create-kit-submit').parent().removeClass('ui-disabled');
                $('#create-kit-suspend').parent().removeClass('ui-disabled');
                createKitRecover();
            }else{
                //TODO eseguire un'azzione alternativa(rimetere pulsante sospendi kit)
                // showError("Nessun kit da recuperare", "Impossibile recuperare il kit", "error");
            }
        }
    )
}

//gestisco il click sul pulsante di creazione kit
$('#create-kit-submit').on('click', function () {
    let createKitForm = new FormData();
    let count  = 0;
    let description = $('#description');
    //controllo se il kit ha una descrizione
    if(description.val() === ""){
        description.focus();
        $('html, body').animate({scrollTop: $(document).height()}, 1000);
        $('#create-kit-fielset input').css('border-bottom', '1px solid #E52612');

        let message = $('<div class="error-message float-left"><span id="lan-insert-description" class="float-left">' + language['lan-insert-description'] + '</span>' +
            '<img src="../GESTIONALEMAGAZZINO/img/alert-icon.png" class="margin-l-5 float-left insert-description-error-image"></div>');

        if ($('.error-message').length !== 0)
            errorMsgCreateKit.find('.error-message').remove();
        errorMsgCreateKit.append(message);
    }else {
        //aggiungo tutti i dati da inviare al server
        $.each(objectListUl.children(), function (key, value) {
            let obj = $(value).attr('id');

            createKitForm.append(key, obj);
            count++;
        });

        createKitForm.append('count', "" + count);
        createKitForm.append('description', description.val());

        //invio richiesta xmlhttp
        let createKitPromise = httpPost('php/ajax/create_kit.php', createKitForm, 'POST');

        //interpreto risposta
        createKitPromise.then(
            function (data) {
                //controllo se ci sono stati dei errori nella chiamata
                if (data.result) {
                    showError($('#error-popup'), language['kit-create-successfull-title'], language['kit-create-successfull-content'], 'success');
                    setTimeout(function () {
                        document.location.href = 'content.php';
                    }, 1500);
                }else {
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');

                    if ($('.error-message').length !== 0)
                        errorMsgCreateKit.find('.error-message').remove();

                    errorMsgCreateKit.append(message);
                }
            }
        )
    }
});

//gestisco il click sul pulsante di sospensione kit
$('#create-kit-suspend').on('click', function () {
    let suspendKitForm = new FormData();
    let count  = 0;

    //aggiungo tutti i dati da inviare al server
    $.each(objectListUl.children(), function (key, value) {
        let obj = $(value).attr('id');
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
                showError($('#error-popup'), language['kit-suspended-success-title'], language['kit-suspended-success-content'], 'success');
                setTimeout(function (){
                    document.location.href = 'content.php';
                }, 1500);
            }else{
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    errorMsgCreateKit.find('.error-message').remove();
                errorMsgCreateKit.append(message);
            }
        }
    )
});

/**
 * Funzione che gestisce il click sul recupero di un kit sospeso
 */
function createKitRecover() {

    //invio richiesta xmlhttp
    let recoverKitPromise = httpPost('php/ajax/recover_kit.php', '', 'GET');

    //interpreto risposta
    recoverKitPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                objectListUl.empty();
                $('#create-kit-suspend').parent().removeClass('display-none');
                $('#create-kit-submit').parent().removeClass('ui-disabled');
                $('#type-select-from-template-fieldset div').removeClass('ui-disabled');

                $.each(data[0], function (key, value) {
                    let objectList = $('<li id="' + value['cod'] + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 ' +
                        'border-radius-10">' + value['name'] + '</a></li>');

                    //aggiungo i pulsanti di cancellazione agli oggetti presenti nel kit
                    let deleteElem = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus ' +
                        'border-red-1 border-radius-10">Elimina dal kit</a>').on('click', function () {
                        $(this).parent().remove();
                    });

                    objectList.append(deleteElem);
                    objectListUl.append(objectList);
                });

                objectListUl.listview('refresh');
            }else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    errorMsgCreateKit.find('.error-message').remove();
                errorMsgCreateKit.append(message);
            }
        }
    )
}