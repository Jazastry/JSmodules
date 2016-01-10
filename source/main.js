var app = app || {};

app.guid = function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + '-' + s4();
};

app.loadModule = function(modulePath, callback) {

    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: modulePath + 'style.css'
    }).appendTo("head");

    $.get(modulePath + 'main.js', function(data) {
        $('body').append('<script type="text/javascript" src="' + modulePath + 'main.js"></script>');

        var htmlData = '';
        $.get(modulePath + 'index.html', function(data) {
            htmlData = data;
            callback(htmlData);
        });


    });
};

var modules = $('div[module]');


for (var i = 0; i < modules.length; i++) {
    var type = $(modules[i]).attr('module');

    if (type !== 'tabs') {

    }

}

app.loadModule('./modules/hello/', function(htmlData) {

    // app.modules = {};
    var mod = new HelloModule(123);
    console.log('mod ', mod);

    $('div[module="hello"]').each(function() {
        var guid = app.guid();
        var helloHtml = $(htmlData).attr('guid', guid);
        $(this).append(helloHtml);

    });
});
