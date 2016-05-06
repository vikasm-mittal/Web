module app {
    export class weatherCtrl {

        //#region private members

        private _zipCode: string;
        private _zipCodeLabel: string = "Zip code:";
        private _httpService: ng.IHttpService;
        private _weatherResult: WeatherResult;
        private _temp: string;
        private _humidity: string;
        private _name: string;
        private _wind: string;

        //#endregion
        
        //#region constructor

        static $inject = ['$http'];
        constructor(httpService: ng.IHttpService) {
            this._httpService = httpService;
            navigator.geolocation.getCurrentPosition(x => this.OnLocationSuccess(x));            
        }

        //#endregion

        //#region public properties

        public get Temp(): string {
            return this._temp;
        }

        public get Wind(): string {
            return this._wind;
        }

        public get Humidity(): string {
            return this._humidity;
        }

        public get Name(): string {
            return this._name;
        }

        public set ZipCode(value: string) {
            this._zipCode = value;
        }

        public get ZipCode(): string {
            return this._zipCode;
        }

        public get ZipCodeLabel(): string {
            return this._zipCodeLabel;
        }

        //#endregion

        //#region public methods

        public GetWeather() {

            var app_key = "f56ab06f8e1c5e05380e1ad20bd5b61c";
            if (this._zipCode) {                
                var URL = "http://api.openweathermap.org/data/2.5/weather?zip=" + this._zipCode + ", us&appid=" + app_key + "&units=imperial";
                this._httpService.get(URL).then(response=> {
                    if (response.data.weather.length) {
                        this._temp = response.data.main.temp;
                        this._wind = response.data.wind.speed;
                        this._humidity = response.data.main.humidity;
                        this._name = response.data.name;
                    }
                });
            }
        }

        //#endregion

        //#region private methods

        private OnLocationSuccess(position: Position) {
            
            var URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
            this._httpService.get(URL).then(response=> {
                this._weatherResult = response.data as WeatherResult;
                this.ZipCode = this._weatherResult.results[0].address_components.filter(x=> x.types.some(y=> y == 'postal_code'))[0].long_name;                
            });
        }

        //#endregion
    }

    angular.module('MyApp')
        .controller('weatherCtrl', weatherCtrl);
}