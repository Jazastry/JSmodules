var MonitoringModule = (function() {
	function MonitoringModule (parentElement) {
		BroadcastModule.call(this, parentElement);
	}

	// extend base Module prototype
	MonitoringModule.prototype = $.extend( true, MonitoringModule.prototype, BroadcastModule.prototype);

	return MonitoringModule;
}());
