var BroadcastModule = (function() {
	function BroadcastModule () {
		this.guid = app.guid();
		this.properties = {
			'name': 'Broadcast',
			'label': 'BR'			
		};
	}

	BroadcastModule.prototype.getProperties = function() {
		var _this = this;
		return _this.properties;
	};

	return BroadcastModule;
}());
