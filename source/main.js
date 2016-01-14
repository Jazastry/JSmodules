var Module = (function() {
    function Module(parentElement) {
        this.name = $(parentElement).attr('module');
        this.path = './modules/' + this.name + '/';
        this.parentElement = parentElement;
        this.loadCss();

    }

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
        $(_this.parentElement).unbind();
        $(_this.parentElement).remove();
        $(_this.parentElement).find("*").addBack().unbind();
        $(_this.parentElement).find("*").addBack().remove();

        app.removeObject(_this);
        app.removeObject(this);
    };

    return Module;
}());

var BroadcastModule = (function() {
    function BroadcastModule(parentElement, infoChannel) {
        Module.call(this, parentElement);
        this.infoChannel = infoChannel ? infoChannel : 'info_channel_A';    
        this.render();
    }

    // extend base Module prototype
    BroadcastModule.prototype = $.extend(true, BroadcastModule.prototype, Module.prototype);

    BroadcastModule.prototype.clickEvents = function() {
        var _this = this;

        // register broadcast 
        $(_this.parentElement).find('.broadcast_button').on('click', function(e) {
            var channel = _this.infoChannel;
            var val = $(_this.parentElement).find('.info_input').val();
            $('body').trigger(channel, [val]);
        });
    };

    BroadcastModule.prototype.loadModule = function() {
        var _this = this;
        var channel = _this.infoChannel;

        // load chanel name
        $(_this.parentElement).find('.channel_name > span').html(channel);
        $(_this.parentElement).find('.broadcast_button').attr('broadcast-channel', channel);

        // register module to info-channel 
        $('body').on(channel, function(e, message){
            $(_this.parentElement).find('.info_input').val(message);
        });

        _this.clickEvents();
        
        // load current info
        $(_this.parentElement).find('.info_input').val($('#'+channel+'>input').val());
    };

    BroadcastModule.prototype.remove = function() {
        var _this = this;
        // app.infoChannelService.disconnect(_this.channel, _this.guid);
        Module.prototype.remove.call(this);
    };

    BroadcastModule.prototype.render = function(){
        var _this = this;
        Module.prototype.render.call(this, function(){            
            _this.loadModule();
        });
    };

    return BroadcastModule;
}());

var app = app || {};
// app.modules = {};

// factory for registered modules
app.moduleFactory = function(moduleParentElement) {
console.log('moduleParentElement ' , moduleParentElement);
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
        case 'tabs_child_a':
            module = new TabsModule(moduleParentElement);
            break;
        case 'tabs_child_b':
            module = new TabsModule(moduleParentElement);
            break;
        case 'monitoring_tabs':
            module = new MonitoringTabsModule(moduleParentElement); //select_module_dialog
            break;
        default:
            throw new Error('Module Factory - Not implemented module: ' + moduleName);
    }

    // register module
    // app.modules[module.parentElement] = module;
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
