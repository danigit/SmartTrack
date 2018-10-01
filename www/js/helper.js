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

function showError(title, content, type) {
    let elem = $('#error-popup');
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