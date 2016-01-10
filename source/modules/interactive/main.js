var InteractiveModule = (function() {
	function InteractiveModule () {
		this.gui = app.guid();
		this.properties = {
			'name': 'Interactive',
			'label': 'IA'			
		};
	}

	InteractiveModule.prototype.getProperties = function() {
		var _this = this;
		return _this.properties;
	};

	return InteractiveModule;
}());
