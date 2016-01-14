var TabsModuleA = (function() {
    function TabsModuleA(parentElement) {
        Module.call(this, parentElement);

        this.currentTabModule = {};
        this.activeTabIndex = 0;
        this.tabChildren = [];
        this.render();
    }

    // extend base Module prototype
    TabsModuleA.prototype = $.extend(true, TabsModuleA.prototype, Module.prototype);

    // override Module render function
    TabsModuleA.prototype.render = function() {
        var _this = this;

        // load module HTML
        $.get(_this.path + 'index.html', function(moduleHtml) {
            _this.tabLabelContainer = $(moduleHtml).children('.tab_labels_container');
            _this.tabChildren = $(moduleHtml).children('div[module]');
            
            _this.createAppendTabChildrenModule();            
            _this.createPrependTabLabels();
            _this.showCurrentModuleAndLabel();
        });
    };

    TabsModuleA.prototype.createPrependTabLabels = function() {
        var _this = this;

        // add parent tab-container guid to parent labels-container
        $(_this.tabLabelContainer).attr('guid', _this.guid);

        var tabs = _this.tabChildren;
        var label = $(_this.tabLabelContainer).children('.tab_label').clone();
        var labelContainer = $(_this.tabLabelContainer);
        $(labelContainer).html('');

        for (var i = 0; i < tabs.length; i++) {
            var tabName = $(tabs[i]).attr('module');
            var newLabel = $(label).clone();
            $(newLabel).html(tabName)
                .attr('moduleIndex', i);
            $(labelContainer).append(newLabel);
        }

        // add change tab on click function
        $(labelContainer).find('.tab_label').on('click', function(e) {
            _this.changeTab(this);
        });

        $(_this.parentElement).prepend(labelContainer);
    };

    // called on label click
    TabsModuleA.prototype.changeTab = function(label) {
        var _this = this;

        // remove currentTabModule HTML parent-element content
        $(_this.parentElement).children('.tab.active').unbind();
        $(_this.parentElement).children('.tab.active').remove();

        // remove currentTabModule refferences
        _this.currentTabModule.remove();
        app.removeObject(_this.currentTabModule);

        // hide last active modules (remove .active css class)
        $(_this.parentElement).find('.active').removeClass('active');
        // remove all imported module containers
        $(_this.parentElement).find('.module_container').remove();

        // save clicked label tab-index
        _this.activeTabIndex = $(label).attr('moduleindex');
        // generate new module
        _this.createAppendTabChildrenModule();

        _this.showCurrentModuleAndLabel()
    };

    TabsModuleA.prototype.createAppendTabChildrenModule = function() {
        var _this = this;

        // create module 
        var moduleParentElement = $(_this.tabChildren[_this.activeTabIndex]).clone();
        _this.currentTabModule = app.moduleFactory(moduleParentElement);
        $(_this.parentElement).append(_this.currentTabModule.parentElement);
    };

    TabsModuleA.prototype.remove = function() {
        var _this = this;

        // remove labels from DOM
        $(_this.parentElement).find('.tab_labels_container').remove();
        // remove modules content
        $(_this.parentElement).find('.module_container').remove();
        // remove guid from parent container
        $(_this.parentElement).removeAttr('guid');

        // remove app.modules tabs-container and module tabs references
        app.removeObject(this);
        app.removeObject(_this)
    };

    TabsModuleA.prototype.showCurrentModuleAndLabel = function() {
        var _this = this;

        $(_this.parentElement).children(_this.currentTabModule.parentElement).addClass('active');
        $(_this.parentElement).find('.tab_label[moduleindex="' + _this.activeTabIndex + '"]').addClass('active');
    };

    return TabsModuleA;
}());
