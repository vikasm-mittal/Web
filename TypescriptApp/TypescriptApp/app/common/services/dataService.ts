module app.common.services {

    interface IDataService {
        get(resource: string): ng.IPromise<app.domain.EntityBase[]>;
    }

    export class DataService implements IDataService {

        static IID: string = "dataService";
        private httpService: ng.IHttpService;
        private qService: ng.IQService;

        static $inject = ['$http', '$q'];
        constructor(httpService: ng.IHttpService, qService: ng.IQService) {
            this.httpService = httpService;
            this.qService = qService;
        }

        get(resource: string): ng.IPromise<app.domain.EntityBase[]>{

            var self = this;
            var deferred = self.qService.defer(); 

            self.httpService.get(resource).then<any>(
                x=> { deferred.resolve(x.data); },
                y=> { deferred.reject(y); });

            return deferred.promise;
        }

        getSingle(resource: string): ng.IPromise<app.domain.EntityBase> {

            var self = this;
            var deferred = self.qService.defer();

            self.httpService.get(resource).then<any>(
                x=> { deferred.resolve(x.data); },
                y=> { deferred.reject(y); });

            return deferred.promise;
        }

        update(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.put(resource, entity)
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        remove(resource: string): ng.IPromise<any> {
            var self = this;

            var deferred = self.qService.defer();

            self.httpService.delete(resource)
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        add(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase> {
            var self = this;
            var deferred = self.qService.defer();

            self.httpService.post(resource, entity)
                .then(function (result) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }

    angular.module('MyApp').service(DataService.IID, DataService);
}