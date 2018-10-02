$('#insert-type').on('click', function () {
    console.log('insert type pressed');

    $('#insert-type-menu').popup('close');
    setTimeout(function () {
        $('#insert-type-popup').popup();
        $('#insert-type-popup').popup('open');
    }, 500);
   // if($('#insert-type-popup') && !$('#insert-type-popup').closed){
   //     alert('not closed');
   // }
});

$('#submit-input-type').on('click', function (e) {
    e.preventDefault();
    let type = $('#type').val();
    console.log(type);

    let inputTypeForm = new FormData();
    inputTypeForm.append('type', type);

    let inputTypePromise = httpPost('php/ajax/insert_type.php', inputTypeForm, 'POST');

    inputTypePromise.then(
        function (data) {
            if (data.result) {
                $('#insert-type-popup').popup('close');
                showError("Tipologia inserita", "La tipologia e' stata salvata con successo", "success");
            }else {
                showError('Tipologia non inserita', data.message, 'error');
            }
        }
    )
});