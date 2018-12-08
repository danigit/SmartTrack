/**
 * Funzione che recupera lo stato dei tag
 */
function tagStatus() {
    //invio richiesta xmlhttp
    let allTagsPromise = httpPost('php/ajax/get_tag_status.php', '', 'GET');

    //interpreto risposta
    allTagsPromise.then(
        function (data) {
            let tagStatusBody = $('#tag-status-body');
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                tagStatusBody.empty();
                let tableRow, i = 0;
                $.each(data[0], function (key, value) {
                    tableRow = setTableRowColor(i++);
                    //elaboro le righe della tabella e le visualizzo
                    $.each(value, function (innerKey, innerValue) {
                        if (innerKey === 'battery' && innerValue === "0") {
                            tableRow.append('<img src="../GESTIONALEMAGAZZINO/img/full-battery.png" class="margin-auto">');
                        }else if( innerKey === 'battery' && innerValue === "1") {
                            tableRow.append('<img src="../GESTIONALEMAGAZZINO/img/low-battery.png" class="margin-auto">');
                        }else if (innerKey !== 'd') {
                                tableRow.append('<td class="font-x-large center-text">' + innerValue + '</td>');
                        }
                    });

                    tagStatusBody.append(tableRow).trigger('create');
                });
                showEmptyTable(tagStatusBody, language['no-kit-to-show']);
            } else {
                showEmptyTable(allKitHistoryBody, language['no-server-response'] + ". <br> Error: " + data.message);
            }
        }
    );
};

