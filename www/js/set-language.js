
$(document).on('ready', function () {
    loopPage($('body').children());
});

function loopPage(children) {
    $.each(children, function (key, value) {
        loopPage($(value).children());

        let id = $(value).attr('id');
        if (id in language) {
            $(value).text(language[id]);
        }
    });
}