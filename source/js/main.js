var Module = (function() {
    function Module(parentElement) {
        this.name = $(parentElement).attr('module');
        this.guid = app.guid();
        this.path = './modules/'+ this.name +'/';
        this.parentElement = parentElement;

        this.addDependencies();
    }

    Module.prototype.addDependencies = function() {
        var _this = this;

        _this.attachGuidToParentElement();
        _this.loadCss();
    };

    // attach guid attribute to parent element
    Module.prototype.attachGuidToParentElement = function() {
        var _this = this;

        $(_this.parentElement).attr('guid', _this.guid);
    };

    // load module css
    Module.prototype.loadCss = function() {
        var _this = this;

        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: _this.path + 'style.css'
        }).appendTo("head");
    };

    Module.prototype.render = function() {
        var _this = this;

        // load module html
        $.get(_this.path + 'index.html', function(htmlData) {
            $(_this.parentElement).append(htmlData);
        });
    };

    return Module;
}());

var app = app || {};
app.modules = {};

// creates unique guid value
app.guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + '-' + s4() + '-' + s4();
};

// factory for registered modules
app.moduleFactory = function(moduleParentElement) {
    var module = {};
    var moduleName = $(moduleParentElement).attr('module');
    var modulePath = './modules/' + moduleName + '/';

    // load module js it is not loaded
    if (!$('script[src="' + modulePath + 'main.js"]').length) {
        $('body').append('<script type="text/javascript" src="' + modulePath + 'main.js"></script>');
    }

    // module factory
    switch (moduleName) {
        case 'hello':
            module = new HelloModule(moduleParentElement);
            break;
        case 'monitoring':
            module = new MonitoringModule(moduleParentElement);
            break;
        case 'interactive':
            module = new InteractiveModule(moduleParentElement);
            break;
        case 'tabs':
            module = new TabsModule(moduleParentElement);
            break;
    }

    return module;
};

app.renderOneLevelModules = function(moduleParentElement){
    var oneLevelModules = $(moduleParentElement).children('div[module]').not('div[module]>div[module]');

    for (var i = 0; i < oneLevelModules.length; i++) {
        var module = app.moduleFactory(oneLevelModules[i]);
        module.render();

        app.modules[module.guid] = module;
    }
};

app.renderOneLevelModules($('body'));