/**
 * Funzione che recupera la correlazione tra oggetti e tag
 */
function getTagObjectCorrelation() {

    //invio richiesta xmlhttp
    let allTagsPromise = httpPost('php/ajax/tag_object_correlation.php', '', 'GET');

    //interpreto la risposta
    allTagsPromise.then(
        function (data) {
            let tagObjectBody = $('#tag-object-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                tagObjectBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    tableRow = setTableRowColor(i++);

                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        tableRow.append('<td class="font-x-large center-text width-50">' + innerValue + '</td>');
                    });

                    tagObjectBody.append(tableRow).trigger('create');
                });

                showEmptyTable(tagObjectBody, language['lan-no-association-to-show']);
            } else {
                showEmptyTable(tagObjectBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
}

