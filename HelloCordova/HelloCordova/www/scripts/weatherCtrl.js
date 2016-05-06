var app;
(function (app) {
    var weatherCtrl = (function () {
        function weatherCtrl(httpService) {
            var _this = this;
            this._zipCodeLabel = "Zip code:";
            this._httpService = httpService;
            navigator.geolocation.getCurrentPosition(function (x) { return _this.OnLocationSuccess(x); });
        }
        Object.defineProperty(weatherCtrl.prototype, "Temp", {
            //#endregion
            //#region public properties
            get: function () {
                return this._temp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(weatherCtrl.prototype, "Wind", {
            get: function () {
                return this._wind;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(weatherCtrl.prototype, "Humidity", {
            get: function () {
                return this._humidity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(weatherCtrl.prototype, "Name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(weatherCtrl.prototype, "ZipCode", {
            get: function () {
                return this._zipCode;
            },
            set: function (value) {
                this._zipCode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(weatherCtrl.prototype, "ZipCodeLabel", {
            get: function () {
                return this._zipCodeLabel;
            },
            enumerable: true,
            configurable: true
        });
        //#endregion
        //#region public methods
        weatherCtrl.prototype.GetWeather = function () {
            var _this = this;
            var app_key = "f56ab06f8e1c5e05380e1ad20bd5b61c";
            if (this._zipCode) {
                var URL = "http://api.openweathermap.org/data/2.5/weather?zip=" + this._zipCode + ", us&appid=" + app_key + "&units=imperial";
                this._httpService.get(URL).then(function (response) {
                    if (response.data.weather.length) {
                        _this._temp = response.data.main.temp;
                        _this._wind = response.data.wind.speed;
                        _this._humidity = response.data.main.humidity;
                        _this._name = response.data.name;
                    }
                });
            }
        };
        //#endregion
        //#region private methods
        weatherCtrl.prototype.OnLocationSuccess = function (position) {
            var _this = this;
            var URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
            this._httpService.get(URL).then(function (response) {
                _this._weatherResult = response.data;
                _this.ZipCode = _this._weatherResult.results[0].address_components.filter(function (x) { return x.types.some(function (y) { return y == 'postal_code'; }); })[0].long_name;
            });
        };
        //#endregion
        //#region constructor
        weatherCtrl.$inject = ['$http'];
        return weatherCtrl;
    }());
    app.weatherCtrl = weatherCtrl;
    angular.module('MyApp')
        .controller('weatherCtrl', weatherCtrl);
})(app || (app = {}));
