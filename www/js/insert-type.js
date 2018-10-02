$('#insert-type').on('click', function () {
   $('#insert-type-popup').popup();
   $('#insert-type-popup').popup('open');
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