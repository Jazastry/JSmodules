var InteractiveModule = (function() {
	function InteractiveModule (parentElement) {
		Module.call(this, parentElement);
	}

	// extend base Module function
	InteractiveModule.prototype = $.extend( true, InteractiveModule.prototype, Module.prototype);

	return InteractiveModule;
}());
