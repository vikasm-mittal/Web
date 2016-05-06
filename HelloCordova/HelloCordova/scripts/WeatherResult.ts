module app {
    export class WeatherResult {

        constructor(public results: Array<WeatherModel>) {
            this.results = results;
        }
    }
}