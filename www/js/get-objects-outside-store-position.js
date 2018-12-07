/**
 * Funzione che recupera la posizione degli oggetti fuori dal magazzino
 */
function getObjectsOutsideStorePosition() {

    //invio richiesta xmlhttp
    let allTagsPromise = httpPost('php/ajax/objects_outside_store_position.php', '', 'GET');

    //interpreto risposta
    allTagsPromise.then(
        function (data) {
            let objectsOutsideStoreBody = $('#objects-outside-store-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                objectsOutsideStoreBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    tableRow = setTableRowColor(i++);
                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        tableRow.append('<td class="font-x-large center-text width-50">' + innerValue + '</td>');
                    });

                    objectsOutsideStoreBody.append(tableRow).trigger('create');
                });

                showEmptyTable(objectsOutsideStoreBody, language['lan-see-kit-objects-no-object']);
            } else {
                showEmptyTable(objectsOutsideStoreBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}

