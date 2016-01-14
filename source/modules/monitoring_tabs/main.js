var MonitoringTabsModule = (function() {
    function MonitoringTabsModule (parentElement) {
        Module.call(this, parentElement);
        this.loadModule();
    }

    // extend base Module prototype
    MonitoringTabsModule.prototype = $.extend( true, MonitoringTabsModule.prototype, Module.prototype);

    MonitoringTabsModule.prototype.loadEvents = function() {
        var _this = this;

        $(_this.parentElement).find('.define_channel_dialog').on('click', function(e){
            var val = $(_this.parentElement).find('input[name="infoChannelName"]').val();
            
        });

        $('#windows_add_module').on('click', function(e){
            var selectParent = $('<div module="select_module_dialog"></div>');
        });       
    };

    MonitoringTabsModule.prototype.loadModule = function() {
        var _this = this;

        Module.prototype.render.call(this, function(){
        
            _this.loadEvents();
        });
    };

    return MonitoringTabsModule;
}());