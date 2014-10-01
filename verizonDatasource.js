	// ## A Datasource Plugin
	//
	// -------------------
	// ### Datasource Definition
	//
	// -------------------
	// **freeboard.loadDatasourcePlugin(definition)** tells freeboard that we are giving it a datasource plugin. It expects an object with the following:
	freeboard.loadDatasourcePlugin({
		// **type_name** (required) : A unique name for this plugin. This name should be as unique as possible to avoid collisions with other plugins, and should follow naming conventions for javascript variable and function declarations.
		"type_name"   : "vzw_uws",
		// **display_name** : The pretty name that will be used for display purposes for this plugin. If the name is not defined, type_name will be used instead.
		"display_name": "Verizon UWS",
        // **description** : A description of the plugin. This description will be displayed when the plugin is selected or within search results (in the future). The description may contain HTML if needed.
        "description" : "Connects to Verizons M2M UWS APIs",
		// **settings** : An array of settings that will be displayed for this plugin when the user adds it.
		"settings"    : [
			{
				// **name** (required) : The name of the setting. This value will be used in your code to retrieve the value specified by the user. This should follow naming conventions for javascript variable and function declarations.
				"name"         : "user_name",
				// **display_name** : The pretty name that will be shown to the user when they adjust this setting.
				"display_name" : "Username",
				// **type** (required) : The type of input expected for this setting. "text" will display a single text box input. Examples of other types will follow in this documentation.
				"type"         : "text",
				// **default_value** : A default value for this setting.
				"default_value": "",
				// **description** : Text that will be displayed below the setting to give the user any extra information.
				"description"  : "UWS Username",
                // **required** : Set to true if this setting is required for the datasource to be created.
                "required" : true
			},
			{
				"name"        : "password",
				"display_name": "Password",
				// **type "calculated"** : This is a special text input box that may contain javascript formulas and references to datasources in the freeboard.
				"type"        : "text",
				"description" : "UWS Password",
				"required" :  true
			},
			{
				"name"         : "refresh_time",
				"display_name" : "Refresh Time",
				"type"         : "text",
				"description"  : "In seconds",
				"default_value": 60
			}
		],
		// **newInstance(settings, newInstanceCallback, updateCallback)** (required) : A function that will be called when a new instance of this plugin is requested.
		// * **settings** : A javascript object with the initial settings set by the user. The names of the properties in the object will correspond to the setting names defined above.
		// * **newInstanceCallback** : A callback function that you'll call when the new instance of the plugin is ready. This function expects a single argument, which is the new instance of your plugin object.
		// * **updateCallback** : A callback function that you'll call if and when your datasource has an update for freeboard to recalculate. This function expects a single parameter which is a javascript object with the new, updated data. You should hold on to this reference and call it when needed.
		newInstance   : function(settings, newInstanceCallback, updateCallback)
		{
			// myDatasourcePlugin is defined below.
			newInstanceCallback(new verizonDatasource(settings, updateCallback));
		}
	});


	// ### Datasource Implementation
	//
	// -------------------
	// Here we implement the actual datasource plugin. We pass in the settings and updateCallback.
	var verizonDatasource = function(settings, updateCallback)
	{
		var self = this;
		var updateTimer = null;
		var currentSettings = settings;
		var isLoggedIn = false;
		var sessiontoken = null;
		
		
		function updateRefresh(refreshTime) {
			if (updateTimer) {
				clearInterval(updateTimer);
			}

			updateTimer = setInterval(function () {
				self.updateNow();
			}, refreshTime);
		}
		
		function logIn(username,password) {
			$.ajax({
				url: "https://bugvish-prod.apigee.net/sessionservice/login?Username="+username+"&Password="+password,
				//dataType: (errorStage == 1) ? "JSONP" : "JSON",
				type: "GET",
				beforeSend: function (xhr) {
					try {
						_.each(currentSettings.headers, function (header) {
							var name = header.name;
							var value = header.value;

							if (!_.isUndefined(name) && !_.isUndefined(value)) {
								xhr.setRequestHeader(name, value);
							}
						});
					}
					catch (e) {
					}
				},
				success: function (data) {
					console.log('Successful login! ' + data);
					isLoggedIn = true;
					sessiontoken = data["LogInResponse"]["Output"]["SessionToken"];
					console.log(sessiontoken);
// 					lockErrorStage = true;
// 					updateCallback(data);
				},
				error: function (xhr, status, error) {
					console.log('error!');
// 					if (!lockErrorStage) {
// 						// TODO: Figure out a way to intercept CORS errors only. The error message for CORS errors seems to be a standard 404.
// 						errorStage++;
// 						self.updateNow();
// 					}
				}
			});
		}
		
		/* This is some function where I'll get my data from somewhere */
		function getData()
		{
			var newData = { hello : "world! it's " + new Date().toLocaleTimeString() }; // Just putting some sample data in for fun.

			/* Get my data from somewhere and populate newData with it... Probably a JSON API or something. */
			/* ... */

			// I'm calling updateCallback to tell it I've got new data for it to munch on.
			updateCallback(newData);
		}



		// **onSettingsChanged(newSettings)** (required) : A public function we must implement that will be called when a user makes a change to the settings.
		self.onSettingsChanged = function(newSettings)
		{
			// Here we update our current settings with the variable that is passed in.
			currentSettings = newSettings;
		}

		// **updateNow()** (required) : A public function we must implement that will be called when the user wants to manually refresh the datasource
		self.updateNow = function()
		{
			//getData();
		}

		// **onDispose()** (required) : A public function we must implement that will be called when this instance of this plugin is no longer needed. Do anything you need to cleanup after yourself here.
		self.onDispose = function()
		{
			clearInterval(updateTimer);
			updateTimer = null;
		}

		// Here we call createRefreshTimer with our current settings, to kick things off, initially. Notice how we make use of one of the user defined settings that we setup earlier.
		logIn(currentSettings.user_name,currentSettings.password);
		//updateRefresh(currentSettings.refresh * 1000);
	}
