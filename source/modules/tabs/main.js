var TabsModule = (function(){
	function TabsModule (tabsArray) {
		this.guid = app.guid();
		this.tabs = tabsArray;
		this.properties = {
			'name': 'Tabs',
			'label': 'TB'			
		};
	}

	BroadcastModule.prototype.getProperties = function() {
		var _this = this;
		return _this.properties;
	};

	return TabsModule;
}());