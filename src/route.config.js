import UploadController from './upload.controller';
import InfoController from './info.controller';

export default function RouteConfig($routeProvider) {
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
        .otherwise({
            redirectsTo: '/upload'
        });
}

RouteConfig.$inject = ['$routeProvider'];