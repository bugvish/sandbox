(function () {
    LINE_HISTORY_LENGTH = 50;
    var mgMultiLineWidget = function (settings) {
        var self = this;

        var titleElement = $('<h2 class="section-title"></h2>');
        var metricsGraphicsElement = $('<div id="'+settings.title+'"></div>');

        this.render = function (element) {
            $(element).append(titleElement).append(metricsGraphicsElement);
        }

        this.onSettingsChanged = function (newSettings) {
            titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            //Rebuild line chart with new calculated value updates
            console.log("new calc value. Setting Name: "+settingName+" newValue "+newValue);
            var values = $(metricsGraphicsElement).data().values;
            if (!values) {
                values = [];
            }

            if (values.length >= LINE_HISTORY_LENGTH) {
                values.shift();
            }

            values.push({ date: Date.now(), value: newValue});
            $(metricsGraphicsElement).data().values = values;
            console.log($(metricsGraphicsElement).data().values.toString());
            data_graphic({
                title: "This is a title and stuff",
                description: "and even a description",
                data: values,
                chart_type: 'line',
                target: '#'+settings.title,
                x_accessor: 'date',
                y_accessor: 'value' 
            });
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {
            return 2;
        }

        this.onSettingsChanged(settings);

    };

    freeboard.loadWidgetPlugin({
        type_name: "mgMultiLine",
        display_name: "Metrics Graphics Multi-Line",
        "external_scripts" : [
            "lib/js/thirdparty/d3.min.js",
            "lib/js/thirdparty/metricsGraphics/js/metricsgraphics2.js"

        ],
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
            {
                name: "value1",
                display_name: "Value 1",
                type: "calculated"
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new mgMultiLineWidget(settings));
        }
    });
}());