var SelectModuleDialogModule = (function() {
    function SelectModuleDialogModule () {
        Module.call(this, '<div module="select_module_dialog">HIHOHO</div>');
        this.showModuleNames = ['hello', 'interactive', 'monitoring'];
        this.render();
    }

    // extend base Module prototype
    SelectModuleDialogModule.prototype = $.extend( true, SelectModuleDialogModule.prototype, Module.prototype);

    SelectModuleDialogModule.prototype.loadEvents = function() {
        
    };

    SelectModuleDialogModule.prototype.render = function() {
        var _this = this;

        Module.prototype.render.call(this, function(){
            _this.loadEvents();
        });
    };

    return SelectModuleDialogModule;
}());