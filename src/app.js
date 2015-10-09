//import './styles/style.scss';

import angular from './../public/libs/angularjs/angular';
import MainController from './main.controller';
import FilePickerDirective from './FilePicker/filePicker.directive';
import DataService from './data.service';

angular
    .module('UploadApp', [])
    .controller('MainController', MainController)
    .directive('filePicker', FilePickerDirective)
    .service('dataService', DataService);