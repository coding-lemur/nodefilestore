//import './styles/style.scss';

import './../public/libs/angular/angular.min.js';

import FilePickerDirective from './filepicker/filePicker.directive';
import DataService from './data.service';
import FilesizeFilter from './filesize.filter';
import UploadController from './controller/upload.controller';

angular
    .module('uploadApp', [])
    .directive('filePicker', FilePickerDirective)
    .service('dataService', DataService)
    .filter('filesize', FilesizeFilter)
    .controller('uploadController', UploadController);