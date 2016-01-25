module app.postList {

    class PostCtrl {

        private dataService: app.common.services.DataService;
        private allPosts: app.domain.IPost[];

        static $inject = [app.common.services.ConstantService.IID, app.common.services.DataService.IID];
        constructor(constantService: app.common.services.ConstantService, dataService: app.common.services.DataService) {
            this.dataService = dataService;
        }



        get(): app.domain.IPost[] {
            return this.dataService.get("");
        }
    }
}