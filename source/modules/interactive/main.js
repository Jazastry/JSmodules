var InteractiveModule = (function() {
	function InteractiveModule (parentElement) {
		Module.call(this, parentElement);
		this.loadModule();
	}

	// extend base Module prototype
	InteractiveModule.prototype = $.extend( true, InteractiveModule.prototype, Module.prototype);

	InteractiveModule.prototype.loadEvents = function() {
		var _this = this;

		var channels = $(_this.parentElement).find('.interactive_channel').attr('id');
		console.log('channels ' , channels);

		// register module to info-channel 
		$('body').on(channel, function(e, message){
		    $(_this.parentElement).find('.info_input').val(message);
		});

		_this.clickEvents();
		
		// load current info
		$(_this.parentElement).find('.info_input').val($('#'+channel+'>input').val());
	};

	InteractiveModule.prototype.loadModule = function() {
		var _this = this;

		Module.prototype.render.call(this, function(){            
		    _this.loadEvents();
		});
	};

	return InteractiveModule;
}());
