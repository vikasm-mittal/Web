module app {
    export class WeatherModel {

        constructor(public address_components: Array<AddressModel>) {
            this.address_components = address_components;
        }
    }
}