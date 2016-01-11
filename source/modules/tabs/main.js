var TabsModule = (function() {
    function TabsModule(parentElement) {
        this.currentTabModule = {};
        this.activeTabIndex = 0;
        this.tabChildren = $(parentElement).children('div[module]');
        Module.call(this, parentElement);
    }

    // extend base Module function
    TabsModule.prototype = $.extend(true, TabsModule.prototype, Module.prototype);

    // override render function
    TabsModule.prototype.render = function() {
        var _this = this;

        // load module
        $.get(_this.path + 'index.html', function(htmlData) {
            _this.tabLabelContainer = $(htmlData).children('.tab_labels_container').clone();
            _this.createTabChildren();
            _this.createTabLabels();
            _this.currentTabModule.render();
            $(_this.parentElement).children('div.tab[guid=' + _this.currentTabModule.guid + ']').addClass('active');
            $(_this.parentElement).find('.tab_label[moduleindex="' + _this.activeTabIndex + '"]').addClass('active');
        });
    };

    TabsModule.prototype.createTabLabels = function() {
        var _this = this;

        $(_this.tabLabelContainer).attr('guid', _this.guid);

        var tabs = _this.tabChildren;
        var label = $(_this.tabLabelContainer).children('.tab_label');
        var labelContainer = $(_this.tabLabelContainer);
        $(labelContainer).html('');

        for (var i = 0; i < tabs.length; i++) {
            var tabName = $(tabs[i]).attr('module');
            var newLabel = $(label).clone();
            $(newLabel).html(tabName)
                .attr('moduleIndex', i);
            $(labelContainer).append(newLabel);
        }

        $(labelContainer).find('.tab_label').on('click', function(e) {
            _this.changeTab(this);
        });

        $(_this.parentElement).prepend(labelContainer);
    };

    TabsModule.prototype.changeTab = function(label) {
        var _this = this;
        
        $(_this.parentElement).find('.tab_label[moduleindex="' + _this.activeTabIndex + '"]').removeClass('active');
        $(_this.parentElement).children('div.tab[guid=' + _this.currentTabModule.guid + ']').removeClass('active');
        _this.currentTabModule.remove();


        _this.activeTabIndex = $(label).attr('moduleindex');
        _this.createTabChildren();
        _this.currentTabModule.render();
        $(_this.parentElement).children('div.tab[guid=' + _this.currentTabModule.guid + ']').addClass('active');
        $(_this.parentElement).find('.tab_label[moduleindex="' + _this.activeTabIndex + '"]').addClass('active');

    };

    TabsModule.prototype.createTabChildren = function() {
        var _this = this;

        var module = app.moduleFactory(_this.tabChildren[_this.activeTabIndex]);

        _this.currentTabModule = module;
    };

    TabsModule.prototype.remove = function() {
        var _this = this;
        $(_this.parentElement).find('.tab_labels_container').remove();
        $(_this.parentElement).children('div[module]').not('div[module="tabs"]').html('');
        app.modules[_this.guid] = null;
        delete app.modules[_this.guid];
    };

    return TabsModule;
}());
