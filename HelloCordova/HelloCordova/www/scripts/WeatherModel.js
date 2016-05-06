var app;
(function (app) {
    var WeatherModel = (function () {
        function WeatherModel(address_components) {
            this.address_components = address_components;
            this.address_components = address_components;
        }
        return WeatherModel;
    }());
    app.WeatherModel = WeatherModel;
})(app || (app = {}));
