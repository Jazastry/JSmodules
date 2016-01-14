var TabsModuleB = (function() {
    function TabsModuleB(parentElement) {
        Module.call(this, parentElement);

        this.currentTabModule = {};
        this.activeTabIndex = 0;
        this.tabChildren = $(parentElement).children('div[module]');
        this.render();
    }

    // extend base Module prototype
    TabsModuleB.prototype = $.extend(true, TabsModuleB.prototype, Module.prototype);

    // override Module render function
    TabsModuleB.prototype.render = function() {
        var _this = this;

        // load module HTML
        $.get(_this.path + 'index.html', function(moduleHtml) {
            _this.tabLabelContainer = $(moduleHtml).children('.tab_labels_container').clone();
            
            _this.createTabChildren();
            _this.createTabLabels();

            $(_this.parentElement).children('div.tab[guid=' + _this.currentTabModule.guid + ']').addClass('active');
            $(_this.parentElement).find('.tab_label[moduleindex="' + _this.activeTabIndex + '"]').addClass('active');
        });
    };

    TabsModuleB.prototype.createTabLabels = function() {
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
    TabsModuleB.prototype.changeTab = function(label) {
        var _this = this;

        // remove currentTabModule HTML parent-element content
        $(_this.parentElement).children("*").unbind();
        $(_this.currentTabModule.parentElement).find('.module_container').remove();

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
        _this.createTabChildren();
        // show generated module HTML (add .active css class)
        $(_this.parentElement).children('div.tab[guid=' + _this.currentTabModule.guid + ']').addClass('active');
        $(_this.parentElement).find('.tab_label[moduleindex="' + _this.activeTabIndex + '"]').addClass('active');
    };

    TabsModuleB.prototype.createTabChildren = function() {
        var _this = this;

        // create module 
        var moduleParentElement = _this.tabChildren[_this.activeTabIndex];
        _this.currentTabModule = app.moduleFactory(moduleParentElement);
    };

    TabsModuleB.prototype.remove = function() {
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

    return TabsModuleB;
}());
