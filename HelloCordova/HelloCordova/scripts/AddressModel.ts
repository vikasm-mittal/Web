module app {
    export class AddressModel {

        constructor(public long_name: string, public types: Array<string>) {
            this.long_name = long_name;
            this.types = types;
        }
    }
}