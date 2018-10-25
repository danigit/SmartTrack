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
    if((i % 2) === 0) {
        return $('<tr></tr>');
    }else{
        return  $('<tr class="gray-background"></tr>')
    }
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
    let barcodeLength = 0;
    let fullBarcode = "";
    let parsedCode = 0;

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