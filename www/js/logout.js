
$('#logout').on('click', function () {
    let logoutPromise = httpPost('php/ajax/logout.php');
    logoutPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //ritorna all'area non protetta
                window.location.replace('index.php');
            }
        }
    );
});