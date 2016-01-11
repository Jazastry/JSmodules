var MonitoringModule = (function() {
	function MonitoringModule (parentElement) {
		Module.call(this, parentElement);
	}

	// extend base Module function
	MonitoringModule.prototype = $.extend( true, MonitoringModule.prototype, Module.prototype);

	return MonitoringModule;
}());
