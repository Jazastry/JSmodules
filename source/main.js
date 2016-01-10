var app = app || {};
app.modules = {};

app.guid = function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + '-' + s4();
};

app.loadModule = function(modulePath, callback) {
    // load module css
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: modulePath + 'style.css'
    }).appendTo("head");

    // load module js
    if (!$('script[src="' + modulePath + 'main.js"]').length) {
        $('body').append('<script type="text/javascript" src="' + modulePath + 'main.js"></script>');
    }

    // load module html
    var htmlData = '';
    $.get(modulePath + 'index.html', function(data) {
        htmlData = data;
        callback(htmlData);
    });
};

app.renderModule = function(moduleName) {
    app.loadModule('./modules/' + moduleName + '/', function(htmlData) {
        $('div[module="' + moduleName + '"]').each(function() {
            if (!$(this).html()) {
                var guid = app.guid();
                var module = {};

                switch (moduleName) {
                    case 'hello':
                        module = new HelloModule(guid);
                        break;
                    case 'broadcast':
                        module = new BroadcastModule(guid);
                        break;
                    case 'interactive':
                        module = new InteractiveModule(guid);
                        break;
                    case 'tabs':
                        module = new TabsModule(guid);
                        break;
                }

                app.modules[guid] = module;

                // attach guid to module container
                var helloHtml = $(htmlData).attr('guid', guid);
                $(this).append(helloHtml);
            }
        });

        console.log('app.modules', app.modules);
    });
};

var modules = $('div[module]').not('div[module]>div[module]');
console.log('modules ', modules);

for (var i = 0; i < modules.length; i++) {
    var type = $(modules[i]).attr('module');

    if (type !== 'tabs' && !$(modules[i]).html()) {
        console.log('$(modules[i]).html() - type \n', $(modules[i]).html());
        app.renderModule(type);
    }

}
