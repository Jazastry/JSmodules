var HelloModule = (function() {
	function HelloModule (parentElement) {
		BroadcastModule.call(this, parentElement);
	}

	// extend base Module prototype
	HelloModule.prototype = $.extend( true, HelloModule.prototype, BroadcastModule.prototype);

	return HelloModule;
}());
