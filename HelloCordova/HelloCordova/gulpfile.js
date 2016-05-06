/// <binding BeforeBuild='compile-typescript, copy-typescript' />

var gulp = require('gulp');
var ts = require('gulp-typescript');

var paths = {
    npm: './node_modules/',
    tsSource: './wwwroot/app/**/*.ts',
    tsOutput: 'www/scripts/'
};

var tsProject = ts.createProject('./scripts/tsconfig.json', {
    sortOutput: true,
    noExternalResolve: true
});

gulp.task('compile-typescript', function (done) {
    var tsResult = gulp.src([
        
       "./scripts/typings/angularjs/angular.d.ts",
       "./scripts/typings/angularjs/angular-route.d.ts",
       "./scripts/typings/jquery/jquery.d.ts",
       
       "./scripts/*.ts"
    ])
     .pipe(ts(tsProject), ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest(paths.tsOutput));
});



