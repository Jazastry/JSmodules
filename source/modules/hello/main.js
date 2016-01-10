var HelloModule = (function() {
	function HelloModule (guid) {
		this.gui = guid;
		this.properties = {
			'name': 'Hello',
			'label': 'HL'			
		};
	}

	HelloModule.prototype.getProperties = function() {
		var _this = this;
		return _this.properties;
	};

	return HelloModule;
}());
