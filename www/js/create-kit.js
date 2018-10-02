/**
 * Funzione che crea un nuovo kit
 */
function createKit() {

    let typesSelect = $('#type-select');
    let typeListUl = $('#type-list-ul');
    let selectedType;

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
                typesSelect.append(select);
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#error-msg-create-kit').find('.error-message').remove();
                $('#error-msg-create-kit').append(message);
            }
        }
    );

    typesSelect.on('change', function () {
        selectedType = $('#type-select').find(':selected').attr('id');

        let getObjectsForm = new FormData();
        getObjectsForm.append('type', selectedType);

        let getObjectsPromise = httpPost('php/ajax/get_objects_by_type.php', getObjectsForm, 'POST');

        getObjectsPromise.then(
            function (data) {
                if (data.result) {
                    let list;

                    //svuoto la lista delle tipologie
                    typeListUl.empty();

                    $.each(data[0], function (key, value) {
                        typeListUl.append(inserRow(key, value));
                    });
                    
                    typeListUl.listview('refresh');
                }
            }
        )
    })

    createKitSubmit();
    createKitSuspend();
    createKitRecover();
}

function inserRow(key, value) {
    let list  = $('<li class="margin-bottom-5"></li>');
    let button = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-greenbtn border-green-1 border-radius-10">Aggiungi al kit</a>').on('click', function () {
        let cod = $(this).attr('id');
        let isPresent = false;
        $(this).parent().remove();
        //controllo se l'oggetto e' gia' presente nella lista
        $.each($('#object-list-ul').children(), function (key, value) {
            if ($(value).attr('id') === cod) {
                isPresent = true;
            }
        });

        //se l'oggetto e' gia' presente non lo inserisco piu'
        if(!isPresent){
            let objectList = $('<li id="' + cod + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 border-radius-10">' + value['name'] + '</a></li>');
            let deleteElem = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus border-red-1 border-radius-10">Elimina dal kit</a>').on('click', function () {
                $(this).parent().remove();
                console.log('inserting seccond: ' + key + '/' + value);
                $('#type-list-ul').append(inserRow(key, value));
                $('#type-list-ul').listview('refresh');
            });

            objectList.append(deleteElem);
            $('#object-list-ul').append(objectList);
            $('#object-list-ul').listview('refresh');
            $('.create-kit-button-submit a').removeClass('ui-disabled');
            $('.create-kit-button-suspend a').removeClass('ui-disabled');
        }else{
            showError("Impossibile aggiungere elemento", "L'elemento e' gia' presente tra gli oggetti di questo kit", "error");
        }

    });

    list.append('<a href="#" class="border-orange-1 border-radius-10">' + value['name'] + '</a>');
    list.append(button);
    return list;
}
/**
 * Funzione che controlla se c'e' un kit da recuperare e lo recupera
 */
function controlRecoverKit() {
    let controlRecoverKitPromise = httpPost('php/ajax/control_recover_kit.php', '', 'GET');
    controlRecoverKitPromise.then(
        function (data) {
            if (data.result) {
                $('.create-kit-button-suspend').addClass('display-none');
                $('.create-kit-button-recover').removeClass('display-none');
                $('#create-kit-submit').addClass('ui-disabled');
                $('#type-select-fieldset div').addClass('ui-disabled');
            }else{

            }
        }
    )
}

/**
 * Funzione che gestisce il click sul pulsante di creazione kit
 */
function createKitSubmit() {
    $('#create-kit-submit').on('click', function () {
        let createKitForm = new FormData();
        let count  = 0;

        //controllo se il kit ha una descrizione
        if($('#description').val() === ""){
            $('html, body').animate({scrollTop: $(document).height()}, 1000);
            $('#create-kit-fielset input').css('border-bottom', '1px solid #E52612');
            let message = $('<div class="error-message"><span>Inserire una descrizione per il kit</span></div>');
            if ($('.error-message').length !== 0)
                $('#error-msg-create-kit').find('.error-message').remove();
            $('#error-msg-create-kit').append(message);
        }else {
            //aggiungo tutti i dati da inviare al server
            $.each($('#object-list-ul').children(), function (key, value) {
                let obj = $(value).attr('id');
                createKitForm.append(key, obj);
                count++;
            });

            createKitForm.append('count', "" + count);
            createKitForm.append('description', $('#description').val());


            let createKitPromise = httpPost('php/ajax/create_kit.php', createKitForm, 'POST');
            createKitPromise.then(
                function (data) {
                    if (data.result) {
                        //TODO mostrare il messaggio che il kit e' statto creato e ripristinare la pagina
                        // $('#object-list-ul').empty();
                        // $('#type-list-ul').empty();
                        // $('.kit-description-container input').val('');
                        // $('.kit-description-container input').trigger('create');
                        // $('#type-select option:eq(0)').prop('selected', true);
                        // $('#type-select').selectmenu('refresh');
                        // $('#error-msg-create-kit').empty();
                        // $('.create-kit-button-submit a').addClass('ui-disabled');
                        // $('.create-kit-button-suspend a').addClass('ui-disabled');
                        // $('#create-kit-fielset input').css('border-bottom', '1px solid #6AB8C1');
                        document.location.href = 'content.php';
                    }else {
                        let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                        if ($('.error-message').length !== 0)
                            $('#error-msg-create-kit').find('.error-message').remove();
                        $('#error-msg-create-kit').append(message);
                    }
                }
            )
        }
    });
}

/**
 * Funzione che gestisce il click sul pulsante di sospensione della creazione del kit
 */
function createKitSuspend() {
    $('#create-kit-suspend').on('click', function () {
        let suspendKitForm = new FormData();
        let count  = 0;

        //aggiungo tutti i dati da inviare al server
        $.each($('#object-list-ul').children(), function (key, value) {
            let obj = $(value).attr('id');
            suspendKitForm.append(key, obj);
            count++;
        });

        suspendKitForm.append('count', "" + count);

        let createKitPromise = httpPost('php/ajax/suspend_kit.php', suspendKitForm, 'POST');

        createKitPromise.then(
            function (data) {
                if (data.result) {
                    //ripristino la pagina
                    // $('#object-list-ul').empty();
                    // $('#type-list-ul').empty();
                    // $('#type-select option:eq(0)').prop('selected', true);
                    // $('#type-select').selectmenu('refresh');
                    // $('#create-kit-submit').addClass('ui-disabled');
                    // $('.create-kit-button-suspend').addClass('display-none');
                    // $('.create-kit-button-recover').removeClass('display-none');
                    // $('#type-select-fieldset div').addClass('ui-disabled');
                    // $('.kit-description-container input').val("");
                    document.location.href = 'content.php';
                }else{
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                    if ($('.error-message').length !== 0)
                        $('#error-msg-create-kit').find('.error-message').remove();
                    $('#error-msg-create-kit').append(message);
                }
            }
        )
    });
}

/**
 * Funzione che gestisce il click sul recupero di un kit sospeso
 */
function createKitRecover() {
    $('#create-kit-recover').on('click', function () {

        let recoverKitPromise = httpPost('php/ajax/recover_kit.php', '', 'GET');

        recoverKitPromise.then(
            function (data) {
                if (data.result) {
                    $('.create-kit-button-recover').addClass('display-none');
                    $('.create-kit-button-suspend').removeClass('display-none');
                    $('#create-kit-submit').removeClass('ui-disabled');
                    $('#type-select-fieldset div').removeClass('ui-disabled');

                    $.each(data[0], function (key, value) {
                        let objectList = $('<li id="' + value['cod'] + '" class="font-large margin-bottom-5"><a href="#" class="border-green-1 border-radius-10">' + value['name'] + '</a></li>');
                        let deleteElem = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '" class="ui-icon-redminus border-red-1 border-radius-10">Elimina dal kit</a>').on('click', function () {
                            $(this).parent().remove();
                        });
                        objectList.append(deleteElem);
                        $('#object-list-ul').append(objectList);
                    });

                    $('#object-list-ul').listview('refresh');
                }else {
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                    if ($('.error-message').length !== 0)
                        $('#error-msg-create-kit').find('.error-message').remove();
                    $('#error-msg-create-kit').append(message);
                }
            }
        )
    })
}