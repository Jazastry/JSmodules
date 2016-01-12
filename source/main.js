var Module = (function() {
    function Module(parentElement) {
        this.name = $(parentElement).attr('module');
        this.guid = app.guid();
        this.path = './modules/' + this.name + '/';
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

        // loads css if is not loaded
        if ($('head>link[href="' + _this.path + 'style.css"]').length <= 0) {
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: _this.path + 'style.css'
            }).appendTo("head");
        }
    };

    Module.prototype.render = function(callback) {
        var _this = this;

        // load module html
        $.get(_this.path + 'index.html', function(htmlData) {
            $(_this.parentElement).append(htmlData);
            callback();
        });
    };

    Module.prototype.remove = function() {
        var _this = this;
        $(_this.parentElement).find("*").addBack().unbind();
        $(_this.parentElement).find('.module_container').remove();
        $(_this.parentElement).html('');
        $(_this.parentElement).removeAttr('guid');

        app.removeObject(app.modules[_this.guid]);
        app.modules[_this.guid] = null;
        delete app.modules[_this.guid];
        app.removeObject(_this);
        app.removeObject(this);
    };

    return Module;
}());

var BroadcastModule = (function() {
    function BroadcastModule(parentElement) {
        Module.call(this, parentElement);
        this.channel = 'infoChannelA';        
        this.render();
    }

    // extend base Module prototype
    BroadcastModule.prototype = $.extend(true, BroadcastModule.prototype, Module.prototype);

    BroadcastModule.prototype.clickEvents = function() {
        var _this = this;

        // register broadcast 
        $(_this.parentElement).find('.broadcast_button').on('click', function(e) {
            var val = $(_this.parentElement).find('.info_input').val();
            app.infoChannelService.broadcast(_this.channel, val, _this.guid);
        });
    };

    BroadcastModule.prototype.loadModule = function() {
        var _this = this;

        // register module to info-channel 
        app.infoChannelService.connect(_this.channel, _this.guid, function(info){
            // visualize info callback
            $(_this.parentElement).find('.info_input').val(info);
        });

        $(_this.parentElement).find('.info_input').val(app.infoChannelService.getInfo(_this.channel));        
    };

    BroadcastModule.prototype.remove = function() {
        var _this = this;
        app.infoChannelService.disconnect(_this.channel, _this.guid);
        Module.prototype.remove.call(this);
    };

    BroadcastModule.prototype.render = function(){
        var _this = this;
        Module.prototype.render.call(this, function(){
            _this.clickEvents();
            _this.loadModule();
        });
    };

    return BroadcastModule;
}());

var app = app || {};
app.modules = {};

// creates unique guid value
app.guid = function() {
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

    // register module
    app.modules[module.guid] = module;
    console.log('module ' , module);
    return module;
};

app.removeObject = function(obj) {
    for (var member in obj) {
        // preserve channel value from deletion
        if (member !== 'channel') {
            delete obj[member];
        }
    }
    obj = null;
};

// load nad render one level modules
app.renderOneLevelModules = function(moduleParentElement) {
    var oneLevelModules = $(moduleParentElement).children('div[module]').not('div[module]>div[module]');

    for (var i = 0; i < oneLevelModules.length; i++) {
        var module = app.moduleFactory(oneLevelModules[i]);
        module = null;
    }
};

app.renderOneLevelModules($('body>.container'));
