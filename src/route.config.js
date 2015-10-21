import UploadController from './controller/upload.controller';
import InfoController from './controller/info.controller';
import DownloadController from './controller/download.controller';

export default function RouteConfig($routeProvider, $locationProvider) {
    $routeProvider
        .when('/upload', {
            templateUrl: '/partials/upload.html',
            controller: UploadController,
            controllerAs: 'vm'
        })
        .when('/info/:uploadToken', {
            templateUrl: '/partials/info.html',
            controller: InfoController,
            controllerAs: 'vm'
        })
        .when('/download/:uploadToken', {
            templateUrl: '/partials/download.html',
            controller: DownloadController,
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/upload'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}

RouteConfig.$inject = ['$routeProvider', '$locationProvider'];