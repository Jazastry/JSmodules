var app = app || {};
app.infoChannelService = (function(){
	function InfoChannelService () {
		this.channels = {
			'infoChannelA': {
				'name': 'infoChannelA',
				'listeners': {},
				'info': ''
			}
		};
	}

	InfoChannelService.prototype.connect = function(chanelName, id, callback) {
		var _this = this;
		_this.channels[chanelName].listeners[id] = callback;
	};

	InfoChannelService.prototype.disconnect = function(chanelName, id) {
		var _this = this;

		_this.channels[chanelName].listeners[id] = null;
		delete _this.channels[chanelName].listeners[id];
	};

	InfoChannelService.prototype.broadcast = function(chanelName, info, id) {
		var _this = this;
		var listeners = _this.channels[chanelName].listeners;
		for(var key in listeners) {
			if (key !== id) {
				listeners[key](info);
			}			
		}

		_this.channels[chanelName].info = info;	
	};

	InfoChannelService.prototype.getInfo = function(chanelName) {
		var _this = this;

		return _this.channels[chanelName].info ? _this.channels[chanelName].info : '';
	};

	return new InfoChannelService();
}());