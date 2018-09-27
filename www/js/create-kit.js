
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
                $.each(data[0], function (key, value) {
                    select += '<option>' + value['type'] + '</option>';
                });
                typesSelect.append(select);
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#error-msg').find('.error-message').remove();
                $('#error-msg').append(message);
            }
        }
    );

    typesSelect.on('change', function () {
        selectedType = this.value;
        console.log('type' + selectedType);

        let getObjectsForm = new FormData();
        getObjectsForm.append('type', selectedType);

        let getObjectsPromise = httpPost('php/ajax/get_objects_by_type.php', getObjectsForm, 'POST');

        getObjectsPromise.then(
            function (data) {
                if (data.result) {
                    let list = $('<li></li>');
                    typeListUl.empty();

                    $.each(data[0], function (key, value) {
                        let button = $('<a href="#" id="' + value['cod'] + '" data-name="' + value['name'] + '">Aggiungi al kit</a>').on('click', function () {
                            let cod = $(this).attr('id');
                            let isPresent = false;
                            // console.log($(button).attr('data-name'));
                            $.each($('#object-list-ul').children(), function (key, value) {
                                if ($(value).attr('id') === cod) {
                                    isPresent = true;
                                }
                            });

                            if(!isPresent){
                                $('#object-list-ul').append('<li id="' + cod + '" class="font-large">' + value['name'] + '</li>');
                                $('#object-list-ul').listview('refresh');
                                $('.create-kit-button-submit a').removeClass('ui-disabled');
                                $('.create-kit-button-suspend a').removeClass('ui-disabled');
                            }
                        });
                        list.append('<a href="#">' + value['name'] + '</a>');
                        list.append(button);
                        typeListUl.append(list);
                        list = $('<li></li>');
                    });
                    typeListUl.listview('refresh');
                }
            }
        )
    });

    $('#create-kit-submit').on('click', function () {
        let createKitForm = new FormData();
        let count  = 0;
        if($('#description').val() === ""){
            let message = $('<div class="center-text error-message"><span>Inserire una descrizione per il kit</span></div>');
            if ($('.error-message').length !== 0)
                $('#error-msg-create-kit').find('.error-message').remove();
            $('#error-msg-create-kit').append(message);
        }else {
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
                        console.log("kit creato: " + data);
                    }
                }
            )
        }
    });

    $('#create-kit-suspend').on('click', function () {
        let suspendKitForm = new FormData();
        let count  = 0;

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
                    $('#object-list-ul').empty();
                    $('#type-list-ul').empty();
                    $('#type-select option:eq(0)').prop('selected', true);
                    $('#type-select').selectmenu('refresh');
                    $('#create-kit-submit').addClass('ui-disabled');
                    $('.create-kit-button-suspend').addClass('display-none');
                    $('.create-kit-button-recover').removeClass('display-none');
                    console.log("kit creato: " + data);
                }
            }
        )
    });

    $('#create-kit-recover').on('click', function () {
        let recoverKitPromise = httpPost('php/ajax/recover_kit.php', '', 'GET');
        recoverKitPromise.then(
            function (data) {
                if (data.result) {
                    $('.create-kit-button-recover').addClass('display-none');
                    $('.create-kit-button-suspend').removeClass('display-none');
                    $('#create-kit-submit').removeClass('ui-disabled');
                    $.each(data[0], function (key, value) {
                        $('#object-list-ul').append('<li id="' + value['cod'] + '" class="font-large">' + value['name'] + '</li>');
                    })
                    $('#object-list-ul').listview('refresh');
                }
            }
        )
    })
}

function controlRecoverKit() {
    let controlRecoverKitPromise = httpPost('php/ajax/control_recover_kit.php', '', 'GET');
    controlRecoverKitPromise.then(
        function (data) {
            if (data.result) {
                $('.create-kit-button-suspend').addClass('display-none');
                $('.create-kit-button-recover').removeClass('display-none');
                $('#create-kit-submit').addClass('ui-disabled');
            }
        }
    )
}
