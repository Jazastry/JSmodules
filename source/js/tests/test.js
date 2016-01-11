var channels = {
			'infoChannelA': {
				'name': 'infoChannelA',
				'listeners': {}
			}
		};

channels['infoChannelA'].listeners['listener1'] = function(info){console.log(info); };

channels.infoChannelA.listeners.listener1('hohohoh');

delete channels.infoChannelA.listeners.listener1;


channels.infoChannelA.listeners.listener1('hohohoh');

