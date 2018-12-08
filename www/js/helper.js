/**
 * Funzione che esegue una chiamata xmlhttp
 * @param url - indirizzo url
 * @param input - i valori da passare alla chiamata
 * @param type - il typo della chiamata POST | GET
 * @returns {Promise} - la risposta della chiamata
 */
function httpPost(url, input, type) {
    return new Promise(function (resolve, reject) {
        let httpReq = new XMLHttpRequest();
        httpReq.open(type, url, true);
        httpReq.onreadystatechange = function () {
            if(httpReq.readyState === 4){
                if(httpReq.status === 200){
                    resolve(JSON.parse(httpReq.responseText));
                }else{
                    reject(httpReq.statusText);
                }
            }
        };
        httpReq.send(input);
    });
}

/**
 * Funzione che mostra un errore in modalita' popup
 * @param errorPopup
 * @param title - titolo dell'errore
 * @param content - contenuto dell'errore
 * @param type - il tipo di messaggio
 */
function showError(errorPopup, title, content, type) {
    let elem = errorPopup;
    if(type === 'success') {
        elem.removeClass('error-popup');
        elem.addClass('success-popup');
        $('.error-title').text(title);
        $('.error-content').text(content);
        elem.popup();
        elem.popup("open");

    }else if(type === 'error'){
        elem.removeClass('success-popup');
        elem.addClass('error-popup');
        $('.error-title').text(title);
        $('.error-content').text(content);
        elem.popup();
        elem.popup("open");
    }

    setTimeout(function () {
        elem.popup("close");
    }, 2000);
}

function setTableRowColor(i) {
    return ((i % 2) === 0) ? $('<tr></tr>') : $('<tr class="gray-background"></tr>');
}

function showMessage(insertObject, message, type) {
    insertObject.empty();
    insertObject.append('<p>' + message + '</p>');
    insertObject.addClass(type);

    setTimeout(function () {
        insertObject.empty();
        insertObject.removeClass(type);
    }, 2000)
}

function readBarCode(){
    let barcodeLength = 0, fullBarcode = "", parsedCode = 0;

    $('#bar-code').on('keyup', function (event) {
        barcodeLength++;
        if(barcodeLength === 10){
            fullBarcode = $('#bar-code').val();
            parsedCode = fullBarcode.substring(1, fullBarcode.length - 1);
            console.log(parsedCode);
            barcodeLength = 0;
            return parsedCode;
        }
    })
}

/**
 * Funzione che mostra un messaggio di errore se la tabella e' vuota
 */
function showEmptyTable(table, message) {
    if(table.children().length === 0){
        console.log('table empty');
        $('.' + table.attr('id') + '.table-empty').empty();
        $('.' + table.attr('id') + '.table-empty').append('<p class="margin-top-50 center-text font-x-large bold-text red-color">' + message + '</p>');
    }else{
        $('.' + table.attr('id') + '.table-empty').empty();
    }
}

/**
 * Funzione che mostra il messaggio di conferma elim
 * @param title
 * @param content
 * @param button
 * @param callback
 */
function confirmDeleteType(title, content, button, callback) {
    $("#delete-type-confirm .delete-type-confirm-button").unbind('click');
    $("#delete-type-confirm .delete-type-confirm-header").text(title);
    $("#delete-type-confirm .delete-type-confirm-text").text(content);
    $("#delete-type-confirm .delete-type-confirm-button").text(button).on("click", function() {
        callback();
    });
    $('#delete-type-confirm').popup('open');
}

/**
 * Funzione che gestisce la conferma della cancellazione di un oggetto
 * @param title - titolo popup
 * @param content - contenuto popup
 * @param button - testo pulsante
 * @param callback - la funzione da chiamare
 */
function confirmDeleteObject(title, content, button, callback) {
    $("#delete-object-confirm .delete-object-confirm-button").unbind('click');
    $("#delete-object-confirm .delete-object-confirm-header").text(title);
    $("#delete-object-confirm .delete-object-confirm-text").text(content);
    $("#delete-object-confirm .delete-object-confirm-button").text(button).on("click.delete-type-confirm", function( e ) {
        callback();
    });
    $('#delete-object-confirm').popup('open');
}