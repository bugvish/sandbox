	freeboard.loadDatasourcePlugin({
		"type_name"   : "vzw_uws",
		"display_name": "Verizon UWS",
	        "description" : "Connects to Verizons M2M UWS APIs",
		"settings"    : [
			{
				"name"         : "user_name",
				"display_name" : "Username",
				"type"         : "text",
				"default_value": "",
				"description"  : "UWS Username",
		                "required" : true
			},
			{
				"name"        : "password",
				"display_name": "Password",
				"type"        : "text",
				"description" : "UWS Password",
				"required" :  true
			},
			{
				"name"         : "refresh_time",
				"display_name" : "Refresh Time",
				"type"         : "number",
				suffix		: "seconds",
				"default_value": 60
			}
		],

		newInstance   : function(settings, newInstanceCallback, updateCallback)
		{
			// myDatasourcePlugin is defined below.
			newInstanceCallback(new verizonDatasource(settings, updateCallback));
		}
	});


	// ### Datasource Implementation

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
					console.log('Successful login!');
					isLoggedIn = true;
					sessiontoken = data["LogInResponse"]["Output"]["SessionToken"];
					self.updateNow();
				},
				error: function (xhr, status, error) {
					console.log('error!');
				}
			});
		}
		
		function getData()
		{
			console.log(sessiontoken);
			if (sessiontoken !== null) {
				$.ajax({
					url: "https://bugvish-prod.apigee.net/deviceservice/devicelist?SessionToken="+sessiontoken,
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
						console.log('Successful data grab!');
						console.log(JSON.stringify(data));
						updateCallback(data);
					},
					error: function (xhr, status, error) {
						console.log('error!');
					}
				});
			}
			
		}



		self.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
		}

		self.updateNow = function()
		{
			getData();
		}

		self.onDispose = function()
		{
			clearInterval(updateTimer);
			updateTimer = null;
		}

		logIn(currentSettings.user_name,currentSettings.password);
		updateRefresh(currentSettings.refresh_time * 1000);
	};
