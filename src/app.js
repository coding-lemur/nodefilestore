//import './styles/style.scss';

import angular from './../public/libs/angularjs/angular';
import './../public/libs/angular-route/angular-route.min';
import RouteConfig from './route.config';
import FilePickerDirective from './FilePicker/filePicker.directive';
import DataService from './data.service';
import FilesizeFilter from './filesize.filter';

angular
    .module('UploadApp', ['ngRoute'])
    .config(RouteConfig)
    .directive('filePicker', FilePickerDirective)
    .service('dataService', DataService)
    .filter('filesize', FilesizeFilter);