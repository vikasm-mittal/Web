module app.common.services {

    interface IConstant {
        apiPostURI: string;
    }

    export class ConstantService implements IConstant {

        static IID: string = "constantService";
        apiPostURI: string;

        constructor() {
            this.apiPostURI = '/api/posts/';
        }
    }

    angular.module("MyApp").service(ConstantService.IID, ConstantService);
}