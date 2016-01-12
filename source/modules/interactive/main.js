var InteractiveModule = (function() {
	function InteractiveModule (parentElement) {
		BroadcastModule.call(this, parentElement);
	}

	// extend base Module prototype
	InteractiveModule.prototype = $.extend( true, InteractiveModule.prototype, BroadcastModule.prototype);

	return InteractiveModule;
}());
