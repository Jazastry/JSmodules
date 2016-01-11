var HelloModule = (function() {
	function HelloModule (parentElement) {
		Module.call(this, parentElement);
	}

	// extend base Module function
	HelloModule.prototype = $.extend( true, InteractiveModule.prototype, Module.prototype);

	return HelloModule;
}());
