(function()
{
var messageUpdatedFunctions = [];
var swarmConnected = false;

function onPresence(presence)
{
	console.log(presence);
}

function onMessage(message)
{
	_.each(messageUpdatedFunctions, function(messageUpdatedFunction)
	{
		messageUpdatedFunction(message);
	});
}

function onError(error)
{
	console.log('Bugswarm error! -> ' + JSON.stringify(error));
}

function onConnect()
{
	swarmConnected = true;
}


function connect() {
	if(!swarmConnected)
	{
		SWARM.connect({ apikey: "bc60aa60d80f7c104ad1e028a5223e7660da5f8c",
			resource          : "5cf5ad58fa9ad98a01841fde8e1761b2ca473dbf",
			swarms            : ["69df1aea11433b3f85d2ca6e9c3575a9c86f8182","5dbaf819af6eeec879a1a1d6c388664be4595bb3"],
			onmessage         : onMessage,
			onpresence        : onPresence,
			onerror           : onError,
			onconnect         : onConnect
		});
	}
}

function processStartup(pluginInstance)
{
	connect();

	if(!_.isUndefined(pluginInstance))
	{
		messageUpdatedFunctions.push(pluginInstance.messageReceived);
	}
}

function processShutdown(pluginInstance)
{
	var index = messageUpdatedFunctions.indexOf(pluginInstance.messageReceived);

	if(index != -1)
	{
		messageUpdatedFunctions.splice(index, 1);
	}

	if(messageUpdatedFunctions.length == 0)
	{
                if(swarmConnected)
                {
		SWARM.disconnect();
		swarmConnected = false;
                }
	}
}
	
	freeboard.loadDatasourcePlugin({


    "display_name": "Renesas RL78 Fridge Demo",
    "type_name": "_typeid_",
    "settings": [
        {
            "type": "text",
            "display_name": "Board ID",
            "name": "device_resource_id"
        }
    ],
    "external_scripts": [
        "/vendor/bug-labs/swarm-production.js"
    ],
    newInstance   : function(settings, newInstanceCallback, updateCallback)
	{
		newInstanceCallback(new RL78FridgeDatasourcePlugin(settings, updateCallback));
	}});



	var RL78FridgeDatasourcePlugin = function(settings, updateCallback)
	{
		var self = this;
		var currentSettings = settings;
		var deviceState = {};

		this.updateNow = function()
		{
			// Not implemented
		}

		this.onDispose = function()
		{
			processShutdown(self);
		}

		this.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
		}

		this.messageReceived = function(message)
		{
			if(message.from.resource == currentSettings.device_resource_id)
			{
				var sensorName = message.payload.name;
				var sensorValue = message.payload.feed;

				if(!_.isUndefined(sensorName) && !_.isUndefined(sensorValue))
				{
					switch (sensorName)
					{
						case "Acceleration":
						{
							deviceState["Acceleration_X"] = sensorValue["x"];
							deviceState["Acceleration_Y"] = sensorValue["y"];
							deviceState["Acceleration_Z"] = sensorValue["z"];
							break;
						}
						case "Button":
						{
							deviceState["Button_1"] = sensorValue["b1"];
							deviceState["Button_2"] = sensorValue["b2"];
							deviceState["Button_3"] = sensorValue["b3"];
							break;
						}
						case "Light":
						{
							deviceState["Light"] = sensorValue["Value"];
							break;
						}
						case "Potentiometer":
						{
							deviceState["Potentiometer"] = sensorValue["Raw"];
							break;
						}
						case "Sound Level":
						{
							deviceState["Sound"] = sensorValue["Raw"];
							break;
						}
						case "Temperature":
						{
							deviceState["Temperature"] = sensorValue["TempF"];
							break;
						}
						default:
						{
							deviceState[sensorName] = sensorValue;
						}
					}

					updateCallback(deviceState);
				}
			}
		}

		processStartup(self);
	};

}());
