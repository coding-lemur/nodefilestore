//import './styles/style.scss';

import './../public/libs/angular/angular.min.js';
import './../public/libs/angular-route/angular-route.min.js';

import RouteConfig from './route.config';
import FilePickerDirective from './filepicker/filePicker.directive';
import DataService from './data.service';
import FilesizeFilter from './filesize.filter';

angular
    .module('UploadApp', ['ngRoute'])
    .config(RouteConfig)
    .directive('filePicker', FilePickerDirective)
    .service('dataService', DataService)
    .filter('filesize', FilesizeFilter);